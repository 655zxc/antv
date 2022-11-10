<template>
  <div>
    <div class="menu">
      <button class="btn1" @click="showUpEdge">仅显示向上的边</button>
      <button class="btn2" @click="showData">编辑数据</button>
      <button class="btn3" @click="adjustSpace">调整间距</button>
    </div>

    <div id="container"></div>
  </div>
</template>

<script>
import G6 from "../node_modules/@antv/g6";
// import json from "./json/graph.json";
import json from "./json/complexGraph.json";

export default {
  name: "App",
  data() {
    return {
      data: null,
    };
  },
  methods: {
    //将json转化为G6的data
    getData() {
      let max = 0;
      for (let i in json.points) {
        max = max > json.points[i].level ? max : json.points[i].level;
      }
      let arr = new Array(max + 1);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = [];
      }
      for (let i in json.points) {
        arr[json.points[i].level].push(json.points[i]);
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
        y = 200 * (i + 1);
        for (let j = 0; j < arr[i].length; j++) {
          x = 150 * (j + 1 + (floorMax - arr[i].length) / 2);
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
      json.lines.forEach((p) => {
        let obj;
        let fromId;
        let toId;

        json.points.forEach((q) => {
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
            type: "quadratic",
            style: {
              stroke: "red",
              lineWidth: 3,
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
          size: 50,
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
              fontSize: 20,
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
            'drag-node',
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
      });
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
    showUpEdge() {
      console.log("X");
    },
    showData() {},
    adjustSpace() {},
  },
  mounted() {
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
  height: 1000px; 

}



.menu{
  position: absolute;
  right: 20px;
  top: 20px;
  width: 300px;
  display: flex;
  z-index: 9999;
  height: 30px;
  justify-content: space-around;
}

.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>
