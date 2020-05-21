import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { di } from '@delon/form/src/utils';

@Component({
  selector: 'app-monitor-display-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class MonitorDisplayHomeComponent implements OnInit {


  data: any = {};
  loading = true;

  /* 这里是支持调节的参数 */
  private transitionDuration = 100;  // 过渡动画延时(s)
  private dimension = 3;  // 宫格维度
  private margin = 0.5;  // 外边距数值
  private unit = '%'; // 外边距单位
  private alwaysMax = true;  // 始终为找到最佳布局而改变dimension

  /* 内置全局参数 */
  private _map: any;  // 宫格占位地图 n * n 的二维数组，由于（x, y)，所以x坐标体现在数组行array[x]，y坐标体现在数组列array[x][y]
  private _dragEventXGap: number;  // 鼠标相对于拖拽元素左上角的x偏移量补偿
  private _dragEventYGap: number;  // 鼠标相对于拖拽元素左上角的y偏移量补偿
  private _blockWidth;  // 宫格宽度，被【 private setBlockMargin() 】自动调整
  private _blockHeight;  // 宫格高度，被【 private setBlockMargin() 】自动调整
  private _mashup;  // mashup元素DOM
  private _dragEle;  // 拖拽元素DOM
  private _locationTip;  // 元素拖拽定位提示框DOM
  private _locationTipParams; // 元素拖拽定位提示框历史参数
  private _mashupSize;  // 宫格区域尺寸
  private _blockStyleClassName = '.mashup-block';
  private _dragEleStyleClassName = '.dragEle';
  private _lastTimestap = new Date().getTime();  // 历史时间戳
  private _resize = true;  // 允许调整大小标志
  private _standardCustomBoundary = 6; // 标准、自定义宫格边界值
  private _localFileViews = {}; // 拖入的本机文件视图
  private _Object = Object;  // js-Object类
  private _onMashupResie;  // mashup区域变动监听
  @ViewChild('mashupSetting') private _mashupSettingFrom: ElementRef; // 宫格参数表单
  @ViewChild('homeSetting') private _homeSettingCmpt;

  /*     *************************************************************************************************************************     */
  /*     ****************************************************** 自定义函数部分 *****************************************************     */
  /*     *************************************************************************************************************************     */

  // 关闭文件视图
  private closeFileViewer(msg) {
    let begin = JSON.parse(msg.begin);
    let size = JSON.parse(msg.size);
    for (let i = begin[0]; i < begin[0] + size[0]; i++) {
      for (let j = begin[1]; j < begin[1] + size[1]; j++) {
        this._map[i][j] = {
          empty: true,
          begin: [i, j],
          size: [1, 1],
        };
      }
    }
    delete this._localFileViews[msg.fileViewerId];
    console.log('关闭*****', msg.fileViewerId, this._localFileViews);
  }

  // 自动延展
  private autoExpand(allowAlwaysMax = true) {
    // 获得所有组件
    let dragEles: any = document.querySelectorAll(this._dragEleStyleClassName);
    // 组件索引
    let dragEleIndex = 0;
    // 是否启用最佳布局
    if (this.alwaysMax && allowAlwaysMax) {
      this.dimension = Math.ceil(Math.sqrt(this.getDragEleNumber()));
    }
    // 清空map，设置block尺寸、边距
    this.initArgs();
    // 调整resize开关
    this._resize = true;
    if (this.dimension <= this._standardCustomBoundary) {
      this._resize = false;
    }
    // 标准宫格
    let l = 1;
    // 自定义布局
    if (this.dimension > this._standardCustomBoundary) {
      l = Math.trunc(this.dimension / Math.ceil(Math.sqrt(this.getDragEleNumber())));
    }
    for (let i = 0; i < this.dimension - l + 1; i += l) {
      for (let j = 0; j < this.dimension - l + 1; j += l) {
        if (dragEleIndex == this.getDragEleNumber()) {
          break;
        }
        dragEles[dragEleIndex].parentNode.dataset.begin = `[${j}, ${i}]`;
        dragEles[dragEleIndex].parentNode.dataset.size = `[${l}, ${l}]`;
        dragEleIndex++;
      }
    }
    // 更新布局
    this._mashupSize = '';
  }

  // 应用新设置
  private applyArgs(args) {
    // 检测到宫格维度缩小
    if (args.dimension < this.dimension) {
      // 宫格不够用
      if (args.dimension ** 2 < this.getDragEleNumber()) {
      }
      // 宫格够用，并自动延展
      else {
        this.dimension = args.dimension;
        this.autoExpand(false);
      }
    }
    // 宫格维度没有缩小
    else {
      this.dimension = args.dimension;
    }
    // 调整resize开关
    this._resize = true;
    if (this.dimension <= this._standardCustomBoundary) {
      this._resize = false;
    }
    // 修改参数
    this.transitionDuration = args.transitionDuration;
    this.alwaysMax = args.alwaysMax;
    this.unit = args.unit;
    this.margin = args.margin;
    // 重置map、margin、blockWidth、blockHeight
    this.initArgs();
    // 设置参数
    this.initAnimation();
    // 延时刷新ui
    this._mashupSize = '';
  }

  // 还原元素位置和大小
  private resetToDefault(dimension) {
    // 获取组件
    let drags: any = document.querySelectorAll(this._dragEleStyleClassName);
    // 参数设置函数
    let reLayout = function(layout) {
      for (let drag of drags) {
        drag.parentNode.dataset.size = layout[drag.parentNode.id].size;
        drag.parentNode.dataset.begin = layout[drag.parentNode.id].begin;
      }
    };
    switch (dimension) {
      case 3:
        reLayout(this._3de_layout);
        break;
      case 20:
        reLayout(this._20de_layout);
        break;
      default:
        reLayout(this._20de_layout);
        break;
    }
  }

  // 查找重定位的block.id，对不合法的位置进行处理
  private getDropBlockId(event, size) {
    // 解析size
    if (!Array.isArray(size) && (typeof size == 'string')) {
      size = JSON.parse(size);
    }
    // 获取元素左上角相对于页面的x坐标
    let getPageXofElement = function(element) {
      var offset = element.offsetLeft;
      if (element.offsetParent != null) {
        offset += getPageXofElement(element.offsetParent);
      }
      return offset;
    };
    // 获取元素在页面的y坐标
    let getPageYofElement = function(element) {
      var offset = element.offsetTop;
      if (element.offsetParent != null) {
        offset += getPageYofElement(element.offsetParent);
      }
      return offset;
    };
    // 获取鼠标相对于文档的坐标（兼容）
    let cursorX = event.pageX;
    let cursorY = event.pageY;
    let blocks: any = document.querySelectorAll(this._blockStyleClassName);
    // 获取分块拓展尺寸
    let xGapHalf = (blocks[1].offsetLeft - blocks[0].offsetLeft - blocks[0].offsetWidth) / 2;
    let yGapHalf = (blocks[this.dimension].offsetTop - blocks[0].offsetTop - blocks[0].offsetHeight) / 2;
    let blockWidth = blocks[0].offsetWidth;
    let blockHeight = blocks[0].offsetHeight;
    // 定位
    for (let i = 0; i < this.dimension; i++) {
      // 横向扫描
      let block = blocks[0 + i];
      let blockPageX = getPageXofElement(block);
      if (cursorX >= blockPageX - xGapHalf && cursorX <= blockPageX + blockWidth + xGapHalf) {
        for (let j = 0; j < this.dimension; j++) {
          // 纵向扫描
          block = blocks[0 + j * this.dimension];
          let blockPageY = getPageYofElement(block);
          if (cursorY >= blockPageY - yGapHalf && cursorY <= blockPageY + blockHeight + yGapHalf) {
            // 减去偏移量，并合理化位置，再返回
            let legalX = i - this._dragEventXGap < 0 ? 0 : (i - this._dragEventXGap > this.dimension - size[0] ? this.dimension - size[0] : i - this._dragEventXGap);
            let legalY = j - this._dragEventYGap < 0 ? 0 : (j - this._dragEventYGap > this.dimension - size[1] ? this.dimension - size[1] : j - this._dragEventYGap);
            // 检测是否有位置摆放
            for (let m = 0; m < size[0]; m++) {
              for (let n = 0; n < size[1]; n++) {
                // 检测超界或者有其他组件占位
                if (!this._map[legalX + m] || !this._map[legalX + m][legalY + n] || !this._map[legalX + m][legalY + n].empty) {
                  // console.log(this._map[beginBlockId[0] + i][beginBlockId[1] + j]);
                  // console.log(`在${beginBlockId[0] + i}, ${beginBlockId[1] + j}放不下`);
                  // console.error(`x坐标合法性：${this._map[legalX + m]!=null}，y坐标合法性${this._map[legalX + m][legalY + n]!=null}，有空位？：${this._map[legalY + m][legalY + n].empty}`);
                  // console.error(`${legalX}, ${legalY}没有位置啦`);
                  return this._dragEle.parentNode.dataset.begin;
                }
              }
            }
            return `[${legalX}, ${legalY}]`;
            // return `[${i - this._dragEventXGap}, ${j - this._dragEventYGap}]`;
          }
        }
      }
    }
    return this._dragEle.parentNode.dataset.begin;
  }

  private setBlockMargin(type: string = '5px') {
    if (type == 'no') {
      this._blockWidth = this._blockHeight = `${100 / this.dimension}%`;
    } else {
      // 解析参数
      let args = type.match(/([0-9\.]+)(.+)/);
      // px设定
      if (args[2] == 'px') {
        // 防止非法参数
        if (parseFloat(args[1]) > document.body.offsetWidth / this.dimension * 0.5) {
          this.margin = 5;
          this.unit = 'px';
          return;
        }
        this._blockWidth = this._blockHeight = `calc((100% - ${(this.dimension - 1) * parseFloat(args[1])}px) / ${this.dimension})`;
      }
      // %设定
      else if (args[2] == '%') {
        // 防止非法参数
        if (parseFloat(args[1]) > 100 / this.dimension * 0.5) {
          this.margin = 5;
          this.unit = 'px';
          return;
        }
        this._blockWidth = this._blockHeight = `${(100 - (this.dimension - 1) * parseFloat(args[1])) / this.dimension}%`;
        this._blockHeight = `${(100 - 2 * (this.dimension - 1) * parseFloat(args[1])) / this.dimension}%`;
      }
    }
  }

  // 获得可拖拽组件数目
  private getDragEleNumber() {
    return document.querySelectorAll(this._dragEleStyleClassName).length;
  }

  // 重置宫格参数（逻辑值）map、margin、blockWidth、blockHeight
  private initArgs() {
    // 初始化map二维数组
    this._map = Array.from({ length: this.dimension }, (value0, index0) => {
      let floor = Array.from({ length: this.dimension }, (value1, index1) => {
        return {
          // 内容组件
          empty: true,
          // 起点
          begin: [index0, index1],
          // 占位大小
          size: [1, 1],
        };
      });
      return floor;
    });
    // 初始化block大小
    this.setBlockMargin(this.margin + this.unit);
  }


  // 判断是否过了interval毫秒
  private detectTimestamp(interval): Boolean {
    let curTimestamp = new Date().getTime();
    if (curTimestamp - this._lastTimestap > interval) {
      this._lastTimestap = curTimestamp;
      return true;
    }
    return false;
  }


  // 刷新UI
  private updateUI() {
    console.log('刷新UI...');
    // 重置宫格参数
    this.initArgs();
    // 重新填充元素
    let dragEles: any = document.querySelectorAll(this._dragEleStyleClassName);
    for (let dragEle of dragEles) {
      this.fillElement(dragEle.parentNode.dataset.begin, dragEle, dragEle.parentNode.dataset.size);
    }
  }

  // 清除map占位
  private removePlaceholder(element) {
    // 原始尺寸、起点
    let oriSize = JSON.parse(element.parentNode.dataset.size);
    let oriBegin = JSON.parse(element.parentNode.dataset.begin);
    // 先置空原位map，否则装不下
    for (let i = 0; i < oriSize[0]; i++) {
      for (let j = 0; j < oriSize[1]; j++) {
        this._map[oriBegin[0] + i][oriBegin[1] + j] = {
          empty: true,
          begin: [oriBegin[0] + i, oriBegin[1] + j],
          size: [1, 1],
        };
      }
    }
  }

  /*     *************************************************************************************************************************     */
  /*     ******************************************************** DOM函数 ********************************************************     */
  /*     *************************************************************************************************************************     */

  // 初始化区域并监听拖拽
  private initListeners() {
    clearInterval(this._onMashupResie);
    // 获取组件类指针
    let that = this;
    // ***************** 监听dragstart（开始拖拽）******************
    this._mashup.ondragstart = function(event) {
      // 防止事件重叠
      if (event.target.classList.contains('resize-bottom-right') || event.target.classList.contains('dragEle-content-withTitle')) {
        event.preventDefault();
        return;
      }
      // 先置空原位map，否则装不下
      that.removePlaceholder(event.target);
      let blocks: any = document.querySelectorAll(that._blockStyleClassName);
      // 获取拖动时位置补偿
      let xGapHalf = (blocks[1].offsetLeft - blocks[0].offsetLeft - blocks[0].offsetWidth) / 2;
      let yGapHalf = (blocks[that.dimension].offsetTop - blocks[0].offsetTop - blocks[0].offsetHeight) / 2;
      that._dragEventXGap = Math.floor(event.offsetX / (blocks[0].offsetWidth + xGapHalf));
      that._dragEventYGap = Math.floor(event.offsetY / (blocks[0].offsetHeight + yGapHalf));
      // 获取拖拽元素
      that._dragEle = event.target;
      // 展示占位框
      that.showBorder();
      // 恢复提示框显示
      that._locationTip.dataset.begin = '';
    };
    // **************** 监听drag（拖拽中）**************************
    this._mashup.ondrag = function(event) {
      // 获取选中blockId
      let curBlockId = that.getDropBlockId(event, that._dragEle.parentNode.dataset.size);
      if (curBlockId != that._locationTip.dataset.begin) {
        // 元素拖拽定位提示框重定位
        that.fillElement(curBlockId, that._locationTip, that._dragEle.parentNode.dataset.size);
        // 展示元素拖拽定位提示框
        that._locationTip.dataset.begin = curBlockId;
      }
    };
    // **************** 设置允许拖拽元素（悬停）*********************
    this._mashup.ondragover = function(event) {
      event.preventDefault();
    };
    // **************** 监听dragend（拖拽结束）*********************
    document.ondragend = function(event) {
      // 隐藏占位框
      that.hideBorder();
      // 展示元素拖拽定位提示框
      that._locationTip.style.display = 'none';
      // 获取定位的起始id
      let beginId = that.getDropBlockId(event, that._dragEle.parentNode.dataset.size);
      console.warn(`在${beginId}处创建`);
      // 变换位置
      that.fillElement(beginId, that._dragEle);
    };
    // **************** 监听内容大小变动 *********************
    this._onMashupResie = setInterval(function() {
      let newSize = ' ' + that._mashup.offsetWidth + that._mashup.offsetHeight;
      if (newSize != that._mashupSize) {
        that.updateUI();
        that._mashupSize = newSize;
      }
    }, 500);
    // **************** 监听修改组件大小动作 *********************
    let dragEles: any = document.querySelectorAll(this._dragEleStyleClassName);
    for (let dragEle of dragEles) {
      that.addResizeListener(dragEle);
    }
    // **************** 监听drop（文件拖入）*********************
    // 防止窗口内打开文件
    document.ondragover = function(event) {
      event.preventDefault();
    };
    document.ondrop = function(event) {
      event.preventDefault();
    };
    // 监听文件拖入
    this._mashup.ondrop = function(event) {
      // 防止在窗口内打开图片
      event.preventDefault();
      // 检测到文件拖入
      if (event.dataTransfer.files.length > 0) {
        // 获取第一个文件
        let file = event.dataTransfer.files[0];
        // 获取时间戳作为id
        let tempstamp = new Date().getTime();
        // 添加至_localFileViews
        that._localFileViews[tempstamp] = {
          fileViewerId: tempstamp,
          file: file,
        };
        // 鉴别类型
        if (/.*.mxe/.test(file.name)) {
          that._localFileViews[tempstamp]['settingList'] = ['refreshDelay'];
        } else if (/text\/plain/.test(file.type)) {
          that._localFileViews[tempstamp]['settingList'] = ['fontSize', 'fontColor'];
        }
        // 增加组件数目
        if (that.dimension ** 2 < that.getDragEleNumber()) {
          that.dimension++;
          that.initArgs();
        }
        // 延迟执行autoExpand，否则DOM更新未完成时操作无效
        setTimeout(function() {
          that.autoExpand();
          that.initListeners();
        }, 500);

        console.log('拖入一个文件', file, file.type);
      }
    };
  }

  // 初始化定位区域过渡效果
  private initAnimation(): void {
    let dragEles: any = document.querySelectorAll(this._dragEleStyleClassName);
    for (let dragEle of dragEles) {
      dragEle.style.transitionDuration = `${this.transitionDuration}ms`;
    }
  }

  // 为元素添加重置大小的功能
  private addResizeListener(element: any) {
    // 获取组件类指针
    let that = this;
    // 获取调整图标元素
    let brResizeIcon: any = element.getElementsByClassName('resize-bottom-right')[0];
    // 监听移入缩放按钮
    brResizeIcon.onmouseenter = function(event) {
      brResizeIcon.style.opacity = '1';
    };
    brResizeIcon.onmouseleave = function(event) {
      brResizeIcon.style.opacity = '0';
    };
    // **************** 监听鼠标按下（开始调整大小） *********************
    brResizeIcon.onmousedown = function(event) {
      // 防止事件冒泡到drag
      event.preventDefault();
      console.log('触发者******', event.target);
      // 展示占位框
      that.showBorder();
      // 原始尺寸、起点
      let oriSize = JSON.parse(element.parentNode.dataset.size);
      // 先置空原位map，否则装不下
      that.removePlaceholder(element);
      // 绘制重定位提示框
      that.fillElement(element.parentNode.dataset.begin, that._locationTip, element.parentNode.dataset.size);
      // 鼠标偏移距离
      let xMovement = 0;
      let yMovement = 0;
      // 元素block
      let blocks: any = document.querySelectorAll(that._blockStyleClassName);
      let blockOffsetWidth = blocks[1].offsetLeft - blocks[0].offsetLeft;
      let blockOffsetHeight = blocks[that.dimension].offsetTop - blocks[0].offsetTop;
      that._mashup.onmousemove = function(event) {
        // 鼠标移动总距离
        xMovement += event.movementX;
        yMovement += event.movementY;
        // 鼠标位移/block尺寸
        let xBlockOffset = Math.trunc(xMovement / blockOffsetWidth);
        let yBlockOffset = Math.trunc(yMovement / blockOffsetHeight);
        // 检测尺寸变动尺寸
        if (xBlockOffset || yBlockOffset) {
          let newSizeX = oriSize[0] + xBlockOffset < 1 ? 1 : oriSize[0] + xBlockOffset;
          let newSizeY = oriSize[1] + yBlockOffset < 1 ? 1 : oriSize[1] + yBlockOffset;
          // 新位置
          let newPos = `[${newSizeX}, ${newSizeY}]`;
          // 尝试放置提示框，以鉴别是否有足够空位
          if (that.fillElement(element.parentNode.dataset.begin, that._locationTip, newPos)) {
            element.parentNode.dataset.size = newPos;
          }
        }
      };
      // **************** 监听鼠标抬起（调整大小结束） *********************
      window.onmouseup = function(event) {
        // 更改元素大小
        that.fillElement(element.parentNode.dataset.begin, element, element.parentNode.dataset.size);
        // 隐藏重定位提示框
        that._locationTip.style.display = 'none';
        // 隐藏占位框
        that.hideBorder();
        // 清除鼠标抬起监听
        window.onmouseup = that._mashup.onmousemove = null;
      };
    };
  }

  // 展示占位框
  private showBorder(): void {
    let mashupArea: any = document.getElementById('mashup-area');
    mashupArea.style.opacity = '1';
  }

  // 隐藏占位框
  private hideBorder(): void {
    let mashupArea: any = document.getElementById('mashup-area');
    mashupArea.style.opacity = '0';
  }

  // 获取目标DOM元素，可传入DOM或string或（代表id的）number
  private getTargetDOMElement(target: any) {// 获取目标元素DOM
    if (typeof target == 'number' || typeof target == 'string') {
      target = document.getElementById(target.toString());
    }
    return target;
  }

  // 添加元素并拓展区域，返回是否可放置
  public fillElement(beginBlock: any, element: any, size: any = element.parentNode.dataset.size): Boolean {
    // 跳过0尺寸元素
    if (element.parentNode.dataset.size == '[0, 0]') return;
    // console.log(`准备在 ${beginBlock} 绘制，大小为 ${size}`);
    // 定位起点block块DOM
    beginBlock = this.getTargetDOMElement(beginBlock);
    // 合理显示
    element.style.display = '';
    // 定位起点block.id
    let beginBlockId = JSON.parse(beginBlock.id);
    // 拖拽元素样式
    let eleStyle = element.style;
    // 拖拽元素实际样式
    let cptdEleStyle = getComputedStyle(element);
    // 拖拽元素大小
    if (!Array.isArray(size) && typeof size == 'string') {
      size = JSON.parse(size);
    }
    // 检测是否可以放置该元素
    for (let i = 0; i < size[0]; i++) {
      for (let j = 0; j < size[1]; j++) {
        // 检测超界或者有其他组件占位
        if (!this._map[beginBlockId[0] + i] || !this._map[beginBlockId[0] + i][beginBlockId[1] + j] || !this._map[beginBlockId[0] + i][beginBlockId[1] + j].empty) {
          // console.log(this._map[beginBlockId[0] + i][beginBlockId[1] + j]);
          // console.log(`在${beginBlockId[0] + i}, ${beginBlockId[1] + j}放不下`);
          return false;
        }
      }
    }
    // 定位终点blockid
    let endBlockId = `[${beginBlockId[0] + size[0] - 1}, ${beginBlockId[1] + size[1] - 1}]`;
    // 定位终点block
    let endBlock = this.getTargetDOMElement(endBlockId);
    // 变换位置
    eleStyle.left = `${beginBlock.offsetLeft - parseFloat(cptdEleStyle.marginLeft)}px`;
    eleStyle.top = `${beginBlock.offsetTop - parseFloat(cptdEleStyle.marginTop)}px`;
    eleStyle.width = `${endBlock.offsetLeft - beginBlock.offsetLeft + beginBlock.offsetWidth}px`;
    eleStyle.height = `${endBlock.offsetTop - beginBlock.offsetTop + beginBlock.offsetHeight}px`;
    // 改变定位框颜色
    if (element == this._locationTip) {
      return true;
    }
    // 刷新map元素，并放置提示框占位
    if (element != this._locationTip) {
      // 清除就的map参数占位
      this.removePlaceholder(element);
      for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
          this._map[beginBlockId[0] + i][beginBlockId[1] + j] = {
            empty: false,
            begin: beginBlockId,
            size: size,
          };
          // console.log('填充', beginBlockId[0] + i, beginBlockId[1] + j)
        }
      }
    }
    // 打印坐标map
    // console.log(this._map);
    // 更改起点
    element.parentNode.dataset.begin = beginBlock.id;
    // 变更大小
    element.parentNode.dataset.size = JSON.stringify(size);
    // console.log("放得下")
    return true;
  }


  /*     *************************************************************************************************************************     */
  /*     **************************************************** 生命周期函数部分 *****************************************************     */

  /*     *************************************************************************************************************************     */
  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
    // 设置data
    this.data = [
      { time: '2019-07-17', value: 7 }
      , { time: '2019-07-18', value: 5 }
      , { time: '2019-07-19', value: 4 }
      , { time: '2019-07-20', value: 2 }
      , { time: '2019-07-21', value: 4 }
      , { time: '2019-07-22', value: 7 }
      , { time: '2019-07-23', value: 5 }
      , { time: '2019-07-24', value: 6 }
      , { time: '2019-07-25', value: 5 }
      , { time: '2019-07-26', value: 9 }
      , { time: '2019-07-27', value: 6 }
      , { time: '2019-07-28', value: 3 }
      , { time: '2019-07-29', value: 1 }
      , { time: '2019-07-30', value: 5 }
      , { time: '2019-07-31', value: 3 }
      , { time: '2019-08-01', value: 6 }
      , { time: '2019-08-02', value: 5 }];
    // 初始化宫格参数
    this.initArgs();
    // 添加默认站点组态图
    let time = new Date().getTime();
    this._localFileViews[time] = {
      fileViewerId: time, file: { name: '西安站点监控图', extra: 'default-mxe-file' }, settingList: ['refreshDelay'],
    };
  }


  // *生命周期：视图加载完成
  ngAfterViewInit() {
    // 获取元素拖拽提示框DOM
    this._locationTip = document.getElementById('location-tip');
    this._locationTip.dataset.size = JSON.stringify([0, 0]);
    this._locationTip.dataset.begin = JSON.stringify([0, 0]);
    // 获取mashupDOM
    this._mashup = document.getElementById('mashup');
    // 获取宫格区域尺寸
    this._mashupSize = ' ' + this._mashup.offsetWidth + this._mashup.offsetHeight;
    // 初始化过渡动画
    this.initAnimation();
    // 初始化
    this.initListeners();
    // 刷新UI
    this.autoExpand();
  };

  /*     *************************************************************************************************************************     */
  /*     ******************************************************* 默认布局配置 *****************************************************     */
  /*     *************************************************************************************************************************     */
  // 3 维默认参数

  private _3de_layout = {
    siteAccount: {
      begin: '[0, 0]',
      size: '[1, 1]',
    },
    visitorAccount: {
      begin: '[1, 0]',
      size: '[1, 1]',
    },
    siteMaintenanceAccount: {
      begin: '[2, 0]',
      size: '[1, 1]',
    },
    siteDistribution: {
      begin: '[0, 1]',
      size: '[1, 1]',
    },
    heatMap: {
      begin: '[1, 1]',
      size: '[1, 1]',
    },
    mainWireStability: {
      begin: '[2, 1]',
      size: '[1, 1]',
    },
    runningDeviceAccount: {
      begin: '[0, 2]',
      size: '[1, 1]',
    },
    centralizedFaultWaring: {
      begin: '[1, 2]',
      size: '[1, 1]',
    },
    transmissionQualityBoard: {
      begin: '[2, 2]',
      size: '[1, 1]',
    },
  };
  // 20 维默认参数
  private;
  _20de_layout = {
    siteAccount: {
      begin: '[0, 0]',
      size: '[5, 6]',
    },
    visitorAccount: {
      begin: '[5, 0]',
      size: '[5, 6]',
    },
    siteMaintenanceAccount: {
      begin: '[10, 0]',
      size: '[5, 6]',
    },
    siteDistribution: {
      begin: '[0, 6]',
      size: '[5, 14]',
    },
    heatMap: {
      begin: '[5, 6]',
      size: '[5, 14]',
    },
    mainWireStability: {
      begin: '[15, 0]',
      size: '[5, 10]',
    },
    runningDeviceAccount: {
      begin: '[15, 10]',
      size: '[5, 10]',
    },
    centralizedFaultWaring: {
      begin: '[10, 6]',
      size: '[5, 7]',
    },
    transmissionQualityBoard: {
      begin: '[10, 13]',
      size: '[5, 7]',
    },
  };
  // 30 维默认参数
  private _30de_layout;
  // 40 维默认参数
  private _40de_layout;
}
