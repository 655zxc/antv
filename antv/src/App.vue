<template>
  <div id="container"></div>
</template>

<script>
import G6 from "../node_modules/@antv/g6";
export default {
  name: "App",
  mounted() {
    // 定义数据源
    const data = {
      // 点集
      nodes: [
        {
          id: "node1",
          x: 100,
          y: 100,
          size: 60,
          label: "第一层1",
          conf: [
            {
              label: "conf",
              value: "pai_graph.conf",
            },
          ],
        },
        {
          id: "node2",
          x: 100,
          y: 200,
          size: 60,
          label: "第二层1",
        },
        {
          id: "node3",
          x: 200,
          y: 200,
          size: 60,
          label: "第二层2",
        },
        {
          id: "node4",
          x: 100,
          y: 300,
          size: 60,
          label: "第三层1",
        },
        {
          id: "node5",
          x: 100,
          y: 400,
          size: 60,
          label: "第四层1",
        },
        {
          id: "node6",
          x: 200,
          y: 400,
          size: 60,
          label: "第四层2",
        },
        {
          id: "node7",
          x: 100,
          y: 500,
          size: 60,
          label: "第五层1",
        },
        {
          id: "node8",
          x: 200,
          y: 500,
          size: 60,
          label: "第五层2",
        },
        {
          id: "node9",
          x: 100,
          y: 600,
          size: 60,
          label: "第六层1",
        },
      ],
      // 边集
      edges: [
        // 表示一条从 node1 节点连接到 node2 节点的边
        {
          source: "node1",
          target: "node2",
        },
        {
          source: "node1",
          target: "node3",
        },
        {
          source: "node2",
          target: "node4",
        },
        {
          source: "node3",
          target: "node4",
        },
        {
          source: "node4",
          target: "node5",
        },
        {
          source: "node4",
          target: "node6",
        },
        {
          source: "node5",
          target: "node7",
        },
        {
          source: "node6",
          target: "node8",
        },
        {
          source: "node7",
          target: "node9",
        },
        {
          source: "node8",
          target: "node9",
        },
        {
          source: "node8",
          target: "node3",
          type: "quadratic",
          style: {
            stroke: "red",
            lineWidth:3,
          },
        },
        {
          source: "node8",
          target: "node7",
          type: "quadratic",
          style: {
            stroke: "red",
            lineWidth:3,
          },
        },
      ],
    };

    // 创建 G6 图实例
    const graph = new G6.Graph({
      container: "container", // 指定图画布的容器 id，与第 9 行的容器对应
      // 画布宽高
      width: 1750,
      height: 1600,
      defaultNode: {
        style: {
          fill: "steelblue", // 节点填充色
          stroke: "#66ccff", // 节点描边色
          lineWidth: 1, // 节点描边粗细
        },
        // 节点上的标签文本配置
        labelCfg: {
          // 节点上的标签文本样式配置
          style: {
            fill: "#fff", // 节点标签文字颜色
          },
        },
      },
      defaultEdge: {
        style: {
          endArrow: true,

          opacity: 0.6, // 边透明度
          stroke: "grey", // 边描边颜色
        },
      },
      modes: {
        // 支持的 behavior
        default: ["drag-canvas", "zoom-canvas"],
      },
    });
    // 读取数据
    graph.data(data);
    // 渲染图
    graph.render();
  },
};
</script>

<style>
#container {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>
