<template>
  <div class="box">
    <div class="menu" ref="menu">
      <!-- <a-button class="btn1" @click="showUpEdge">仅显示向上的边</a-button> -->
      <a-button class="btn2" @click="showEditor">编辑数据</a-button>
      <a-button class="btn3" @click="adjustSpace">调整样式</a-button>
    </div>

    <div class="adjustCard">
      <a-card style="width: 300px">
        <span>节点横间距</span
        ><a-input v-model="distanceX" placeholder="Basic usage" />
        <span>节点纵间距</span
        ><a-input v-model="distanceY" placeholder="Basic usage" />
        <span>节点大小</span
        ><a-input v-model="nodeSize" placeholder="Basic usage" />
        <span>字体大小</span
        ><a-input v-model="fontSize" placeholder="Basic usage" />
        <p class="adjustBtn">
          <a-button type="primary" @click="adjust"> 确定 </a-button>
        </p>
      </a-card>
    </div>

    <vue-json-editor
      class="jsonEditor"
      v-model="jsonEditor"
      mode="code"
      :show-btns="false"
      :expandedOnStart="true"
      @json-change="onJsonChange"
    ></vue-json-editor>

    <div id="container"></div>
  </div>
</template>

<script>
import G6 from "../node_modules/@antv/g6";
// import json from "./json/graph.json";
// import json from "./json/complexGraph.json";
import vueJsonEditor from "vue-json-editor";

export default {
  name: "App",
  data() {
    return {
      jsonEditor: {
        points: [
          { id: "11", name: "11", tip: "Graph 11", level: 0 },
          { id: "21", name: "21", tip: "Graph 21", level: 1 },
          { id: "22", name: "22", tip: "Graph 22", level: 1 },
          { id: "23", name: "23", tip: "Graph 23", level: 1 },
          { id: "31", name: "31", tip: "Graph 31", level: 2 },
          { id: "32", name: "32", tip: "Graph 32", level: 2 },
          { id: "33", name: "33", tip: "Graph 33", level: 2 },
          { id: "34", name: "34", tip: "Graph 34", level: 2 },
          { id: "41", name: "41", tip: "Graph 41", level: 3 },
          { id: "42", name: "42", tip: "Graph 42", level: 3 },
          { id: "43", name: "43", tip: "Graph 43", level: 3 },
          { id: "44", name: "44", tip: "Graph 44", level: 3 },
          { id: "45", name: "45", tip: "Graph 45", level: 3 },
          { id: "51", name: "51", tip: "Graph 51", level: 4 },
          { id: "52", name: "52", tip: "Graph 52", level: 4 },
          { id: "53", name: "53", tip: "Graph 53", level: 4 },
          { id: "54", name: "54", tip: "Graph 54", level: 4 },
          { id: "55", name: "55", tip: "Graph 55", level: 4 },
          { id: "56", name: "56", tip: "Graph 56", level: 4 },
          { id: "57", name: "57", tip: "Graph 57", level: 4 },
          { id: "58", name: "58", tip: "Graph 58", level: 4 },
          { id: "59", name: "59", tip: "Graph 59", level: 4 },
          { id: "61", name: "61", tip: "Graph 61", level: 5 },
          { id: "62", name: "62", tip: "Graph 62", level: 5 },
          { id: "63", name: "63", tip: "Graph 63", level: 5 },
          { id: "64", name: "64", tip: "Graph 64", level: 5 },
          { id: "65", name: "65", tip: "Graph 65", level: 5 },
          { id: "66", name: "66", tip: "Graph 66", level: 5 },
          { id: "67", name: "67", tip: "Graph 67", level: 5 },
          { id: "71", name: "71", tip: "Graph 71", level: 6 },
          { id: "72", name: "72", tip: "Graph 72", level: 6 },
          { id: "73", name: "73", tip: "Graph 73", level: 6 },
          { id: "74", name: "74", tip: "Graph 74", level: 6 },
          { id: "75", name: "75", tip: "Graph 75", level: 6 },
          { id: "81", name: "81", tip: "Graph 81", level: 7 },
          { id: "82", name: "82", tip: "Graph 82", level: 7 },
          { id: "83", name: "83", tip: "Graph 83", level: 7 },
          { id: "84", name: "84", tip: "Graph 84", level: 7 },
          { id: "85", name: "85", tip: "Graph 85", level: 7 },
          { id: "86", name: "86", tip: "Graph 86", level: 7 },
          { id: "87", name: "87", tip: "Graph 87", level: 7 },
          { id: "88", name: "88", tip: "Graph 88", level: 7 },
          { id: "89", name: "89", tip: "Graph 89", level: 7 },
          { id: "91", name: "91", tip: "Graph 91", level: 8 },
          { id: "92", name: "92", tip: "Graph 92", level: 8 },
          { id: "93", name: "93", tip: "Graph 93", level: 8 },
          { id: "101", name: "101", tip: "Graph 101", level: 9 },
          { id: "102", name: "102", tip: "Graph 102", level: 9 },
          { id: "103", name: "103", tip: "Graph 103", level: 9 },
          { id: "111", name: "111", tip: "Graph 111", level: 10 },
          { id: "112", name: "112", tip: "Graph 112", level: 10 },
          { id: "113", name: "113", tip: "Graph 113", level: 10 },
          { id: "121", name: "121", tip: "Graph 121", level: 11 },
          { id: "122", name: "122", tip: "Graph 122", level: 11 },
          { id: "123", name: "123", tip: "Graph 123", level: 11 },
          { id: "124", name: "124", tip: "Graph 124", level: 11 },
          { id: "125", name: "125", tip: "Graph 125", level: 11 },
          { id: "131", name: "131", tip: "Graph 131", level: 12 },
        ],
        lines: [
          { from: "11", to: "21" },
          { from: "11", to: "22" },
          { from: "11", to: "23" },
          { from: "21", to: "31" },
          { from: "21", to: "34" },
          { from: "22", to: "33" },
          { from: "23", to: "32" },
          { from: "31", to: "44" },
          { from: "32", to: "45" },
          { from: "33", to: "41" },
          { from: "34", to: "42" },
          { from: "34", to: "43" },
          { from: "41", to: "54" },
          { from: "42", to: "53" },
          { from: "42", to: "56" },
          { from: "42", to: "59" },
          { from: "43", to: "58" },
          { from: "43", to: "52" },
          { from: "44", to: "57" },
          { from: "44", to: "55" },
          { from: "45", to: "56" },
          { from: "45", to: "51" },
          { from: "51", to: "67" },
          { from: "52", to: "65" },
          { from: "53", to: "64" },
          { from: "54", to: "66" },
          { from: "55", to: "62" },
          { from: "56", to: "67" },
          { from: "57", to: "63" },
          { from: "58", to: "64" },
          { from: "59", to: "61" },
          { from: "61", to: "75" },
          { from: "62", to: "73" },
          { from: "63", to: "75" },
          { from: "64", to: "72" },
          { from: "65", to: "75" },
          { from: "66", to: "71" },
          { from: "67", to: "75" },
          { from: "67", to: "74" },
          { from: "71", to: "81" },
          { from: "71", to: "89" },
          { from: "72", to: "85" },
          { from: "72", to: "85" },
          { from: "73", to: "81" },
          { from: "73", to: "86" },
          { from: "73", to: "86" },
          { from: "73", to: "83" },
          { from: "74", to: "87" },
          { from: "74", to: "82" },
          { from: "74", to: "84" },
          { from: "74", to: "88" },
          { from: "74", to: "83" },
          { from: "75", to: "84" },
          { from: "75", to: "82" },
          { from: "75", to: "81" },
          { from: "87", to: "92" },
          { from: "81", to: "91" },
          { from: "84", to: "91" },
          { from: "88", to: "93" },
          { from: "89", to: "93" },
          { from: "84", to: "92" },
          { from: "83", to: "92" },
          { from: "89", to: "91" },
          { from: "86", to: "92" },
          { from: "85", to: "93" },
          { from: "82", to: "92" },
          { from: "81", to: "91" },
          { from: "91", to: "101" },
          { from: "91", to: "102" },
          { from: "91", to: "103" },
          { from: "92", to: "101" },
          { from: "92", to: "102" },
          { from: "92", to: "103" },
          { from: "93", to: "101" },
          { from: "93", to: "102" },
          { from: "93", to: "103" },
          { from: "101", to: "112" },
          { from: "101", to: "113" },
          { from: "102", to: "112" },
          { from: "102", to: "113" },
          { from: "103", to: "111" },
          { from: "103", to: "113" },
          { from: "111", to: "125" },
          { from: "113", to: "123" },
          { from: "112", to: "125" },
          { from: "112", to: "124" },
          { from: "112", to: "123" },
          { from: "113", to: "122" },
          { from: "113", to: "121" },
          { from: "111", to: "121" },
          { from: "121", to: "131" },
          { from: "122", to: "131" },
          { from: "123", to: "131" },
          { from: "124", to: "131" },
          { from: "125", to: "131" },

          { from: "121", to: "34" },
          { from: "111", to: "65" },
          { from: "101", to: "52" },
          { from: "91", to: "75" },
          { from: "131", to: "86" },
          { from: "88", to: "54" },
          { from: "75", to: "57" },
          { from: "44", to: "11" },
          { from: "103", to: "51" },
          { from: "81", to: "59" },
          { from: "62", to: "21" },
          { from: "41", to: "23" },
          { from: "52", to: "45" },
        ],
      }, //json数据
      data: null, //由json转化的G6的数据
      graph: null, //G6的实例
      isShowEditor: false,
      isShowAdjustSpace: false,

      distanceX: 150,
      distanceY: 200,
      nodeSize: 50,
      fontSize: 30,
    };
  },
  components: {
    vueJsonEditor,
  },
  methods: {
    //将json转化为G6的data
    getData() {
      let max = 0;
      for (let i in this.jsonEditor.points) {
        max =
          max > this.jsonEditor.points[i].level
            ? max
            : this.jsonEditor.points[i].level;
      }
      let arr = new Array(max + 1);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = [];
      }
      for (let i in this.jsonEditor.points) {
        arr[this.jsonEditor.points[i].level].push(this.jsonEditor.points[i]);
      }

      let x;
      let y;
      //计算节点
      let nodes = [];
      let floorMax = 0;
      arr.forEach((p) => {
        floorMax = floorMax > p.length ? floorMax : p.length;
      });
      for (let i = 0; i < arr.length; i++) {
        //计算每个node的坐标
        y = this.distanceY * (i + 1);
        for (let j = 0; j < arr[i].length; j++) {
          x = this.distanceX * (j + 1 + (floorMax - arr[i].length) / 2);
          let obj = {
            id: arr[i][j].id,
            x,
            y,
            label: arr[i][j].name,
            conf: arr[i][j].tip,
          };
          nodes.push(obj);
        }
      }

      //计算边
      let edges = [];
      this.jsonEditor.lines.forEach((p) => {
        let obj;
        let fromId;
        let toId;

        this.jsonEditor.points.forEach((q) => {
          if (p.from == q.id) {
            fromId = q.level;
          }
          if (p.to == q.id) {
            toId = q.level;
          }
        });
        //如果是反向的箭头,则设置特殊style
        if (fromId > toId) {
          obj = {
            source: p.from,
            target: p.to,
            type: "line",
            style: {
              stroke: "red",
              lineWidth: 4,
            },
          };
        } else {
          obj = {
            source: p.from,
            target: p.to,
          };
        }
        edges.push(obj);
      });
      this.data = {
        nodes,
        edges,
      };
    },
    drawGraph() {
      // 定义数据源

      const data = this.data;

      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: "container", // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        defaultNode: {
          //节点的默认配置
          size: this.nodeSize,
          style: {
            stroke: "#5B8FF9",
            fill: "#C6E5FF",
            lineWidth: 3,
          },
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: "#00287E",
              fontSize: this.fontSize,
              textAlign: "center",
              textBaseline: "middle",
              fontWeight: "bold",
            },
          },
        },
        // 节点在各状态下的样式
        nodeStateStyles: {
          // hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue",
          },
          // click 状态为 true 时的样式
          click: {
            stroke: "#d9d9d9",
            fill: "#5394ef",
          },
        },

        defaultEdge: {
          style: {
            endArrow: true,
            lineWidth: 2,
            opacity: 0.6, // 边透明度
            stroke: "grey", // 边描边颜色
          },
        },
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            {
              type: "tooltip",
              formatText(model) {
                return model.conf;
                //conf是在node里定义的
              },
              offset: 10,
            },
          ],
        },
        fitView: true,
      });
      this.graph = graph;
      // 鼠标进入节点
      graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
      });

      // 鼠标离开节点
      graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
      });

      // 点击节点
      graph.on("node:click", (e) => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach((cn) => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true

        console.log(e);
      });
      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();
    },
    //仅显示向上的边
    showUpEdge() {},
    //调整间距
    adjustSpace() {
      this.isShowAdjustSpace = !this.isShowAdjustSpace;
      if (this.isShowAdjustSpace) {
        document.querySelector(".adjustCard").style.right = 0 + "px";
      } else {
        document.querySelector(".adjustCard").style.right = -300 + "px";
      }
    },
    adjust() {
      setTimeout(() => {
        this.graph.node(() => {
          return {
            size: this.nodeSize,
            labelCfg: {
              style: {
                fontSize: parseInt(this.fontSize),
              },
            },
          };
        });
        this.getData(); //更新数据data
        this.graph.data(this.data); //使用数据data
        this.graph.render();
      }, 0);
    },
    showEditor() {
      this.isShowEditor = !this.isShowEditor;
      if (this.isShowEditor) {
        document.querySelector(".jsonEditor").style.left = 0 + "px";
      } else {
        document.querySelector(".jsonEditor").style.left = -400 + "px";
      }
    },
    //修改编辑器
    onJsonChange() {
      setTimeout(() => {
        this.getData(); //更新数据data
        this.graph.data(this.data); //使用数据data
        this.graph.render();
      }, 0);
    },
  },
  mounted() {
    // this.jsonEditor = json
    this.getData();
    this.drawGraph();
  },
};
</script>

<style>
#container {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
  width: 100%;
  height: 100%;
}

html,
body {
  height: 100%;
}

.box {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.adjustBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.adjustCard {
  position: absolute;
  z-index: 999;
  transition: 0.3s;
  right: -300px;
  top: 100px;
}

.jsonEditor {
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  width: 400px;

  position: absolute;
  z-index: 999;
  left: -400px;
  transition: 0.3s;
}
.jsonEditor .jsoneditor-vue {
  display: flex;
  flex: 1 1 auto;
}
.jsonEditor .jsoneditor-vue .jsoneditor {
  border: none;
}
.jsonEditor .jsoneditor-vue .jsoneditor .jsoneditor-menu {
  display: none;
}
.jsonEditor .jsoneditor-vue .jsoneditor .jsoneditor-outer {
  margin: 0;
  padding: 0;
}

.menu {
  position: absolute;
  right: 20px;
  top: 20px;
  /* width: 400px; */
  display: flex;
  z-index: 9999;
  height: 30px;
  justify-content: space-around;
}

.menu .ant-btn{
  margin-right: 20px;
}

.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>
