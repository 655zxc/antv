<template>
  <div class="box">
    <div class="menu" ref="menu">
      <div class="selectLabel">向下边类型</div>
      <a-select
        :options="options1"
        style="width: 80px"
        @change="handleChange1"
        v-model="value1"
      >
      </a-select>
      <div class="selectLabel">向上边类型</div>
      <a-select
        :options="options2"
        style="width: 80px"
        @change="handleChange2"
        v-model="value2"
      >
      </a-select>
      <a-button class="btn2" @click="showEditor">编辑数据</a-button>
      <a-button class="btn3" @click="adjustSpace">调整样式</a-button>
      <a-button class="btn4" @click="showClickNodeButton">当前点击表</a-button>
    </div>

    <div class="menu2" ref="menu2">
      <a-checkbox @change="onChangeSCC" :checked="checkSCC">
        存在SCC循环的节点
      </a-checkbox>
      <a-checkbox @change="onChangeNotSCC" :checked="checkNotSCC">
        不存在SCC循环的节点
      </a-checkbox>
    </div>

    <div class="adjustCard">
      <a-card style="width: 300px">
        <span>节点横间距</span
        ><a-input v-model="distanceX" placeholder="Basic usage" />
        <span>节点纵间距</span
        ><a-input v-model="distanceY" placeholder="Basic usage" />
        <span>节点宽</span
        ><a-input v-model="nodeWidth" placeholder="Basic usage" />
        <span>节点高</span
        ><a-input v-model="nodeHeight" placeholder="Basic usage" />
        <span>字体大小</span
        ><a-input v-model="fontSize" placeholder="Basic usage" />
        <p class="adjustBtn">
          <a-button type="primary" @click="adjust"> 确定 </a-button>
        </p>
      </a-card>
    </div>

    <div class="showNode" ref="showNode">
      <a-card style="width: 300px">
        <div>表id:<br />{{ clickNode.id }}</div>
        <div>表名:<br />{{ clickNode.name }}</div>
        <div>表层级:<br />{{ clickNode.level }}</div>
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
        lines: [
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed47a716495ad78b0c5dd3411e5ae6",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed5694755b7571bf8d3117534e83dc",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed4abe2b86a759ab6c7bc118077866",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed4e125645dbb4b52fd7f035ea70fc",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed4e1372ab7e7eb52f51859441d9af",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed4ab9eb45ab74ab6cfffb1df92105",
            to: "11ed55091757096abf8d9bf316d877f7",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4ab9eb45ab74ab6cfffb1df92105",
          },
          {
            from: "11ed47a716495ad78b0c5dd3411e5ae6",
            to: "11ed5694755b7571bf8d3117534e83dc",
          },
          {
            from: "11ed4abe2b86a759ab6c7bc118077866",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed5694755b7571bf8d3117534e83dc",
          },
          {
            from: "11ed47c52ae7b1b48b0c31aa6af07f27",
            to: "11ed4ab9eb45ab74ab6cfffb1df92105",
          },
          {
            from: "11ed4e1108307f93b52f711949535c39",
            to: "11ed4e125645dbb4b52fd7f035ea70fc",
          },
          {
            from: "11ed47a716495ad78b0c5dd3411e5ae6",
            to: "11ed4abe2b86a759ab6c7bc118077866",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4abe2b86a759ab6c7bc118077866",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4e125645dbb4b52fd7f035ea70fc",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4e1372ab7e7eb52f51859441d9af",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4e1372ab7e7eb52f51859441d9af",
          },
          {
            from: "11ed4ab9eb45ab74ab6cfffb1df92105",
            to: "11ed4e125645dbb4b52fd7f035ea70fc",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4e125645dbb4b52fd7f035ea70fc",
          },
          {
            from: "11ed4ab9eb45ab74ab6cfffb1df92105",
            to: "11ed4e1372ab7e7eb52f51859441d9af",
          },
          {
            from: "11ed4f7322c607d78c968fb192178199",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed4e125645dbb4b52fd7f035ea70fc",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed4abe2b86a759ab6c7bc118077866",
            to: "11ed5694755b7571bf8d3117534e83dc",
          },
          {
            from: "11ed5694755b7571bf8d3117534e83dc",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed4e1108307f93b52f711949535c39",
            to: "11ed4e1372ab7e7eb52f51859441d9af",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed4ab9eb45ab74ab6cfffb1df92105",
            to: "11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            from: "11ed494228b84f31ad416faaaf225897",
            to: "11ed4ab9eb45ab74ab6cfffb1df92105",
          },
          {
            from: "11ed4f756b0e24218c9693317591e101",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed494228b84f31ad416faaaf225897",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed47c52ae7b1b48b0c31aa6af07f27",
          },
          {
            from: "11ed4dc090179ed3b52f1b5e2b8a58bf",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed49284dc9e611ad41e792b5469257",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed48476c9b055b88644b35f89b6fbb",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4dbd5336ef2ab52f0b5eef368153",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4f7322c607d78c968fb192178199",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed47c52ae7b1b48b0c31aa6af07f27",
            to: "11ed494228b84f31ad416faaaf225897",
          },
          {
            from: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4e125645dbb4b52fd7f035ea70fc",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4e1108307f93b52f711949535c39",
          },
          {
            from: "11ed4af99a7f4f8e9cd365b61fcdeb4c",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4f800af6adea8c96b1b4cad18b89",
            to: "11ed48476c9b055b88644b35f89b6fbb",
          },
          {
            from: "11ed48476c9b055b88644b35f89b6fbb",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4f800af6adea8c96b1b4cad18b89",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed55a817415e6bbf8dfdf50d0ca358",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed47a0802104118b0c71da0524036d",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4e1108307f93b52f711949535c39",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4a9c71b95bd4ba124fc11388f162",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4dbc97ec762bb52fa3952e31d8ba",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4f756b0e24218c9693317591e101",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4ab9eb45ab74ab6cfffb1df92105",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4dc090179ed3b52f1b5e2b8a58bf",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed4dbd5336ef2ab52f0b5eef368153",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed49284dc9e611ad41e792b5469257",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4dc090179ed3b52f1b5e2b8a58bf",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4ba6151cb3229cd31523377c35da",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed493d0b698245ad41abb48157cfe0",
            to: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            from: "11ed492d892d80efad4113b58d3f9794",
            to: "11ed48476c9b055b88644b35f89b6fbb",
          },
          {
            from: "11ed48476c9b055b88644b35f89b6fbb",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4ba3f25543b99cd3993ff27c0af0",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed4f756b0e24218c9693317591e101",
            to: "11ed48476c9b055b88644b35f89b6fbb",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed49284dc9e611ad41e792b5469257",
          },
          {
            from: "11ed4af7c40f7bce9cd36d65b52859f3",
            to: "11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            from: "11ed4abf5c518a5eab6c79ca1c2f3745",
            to: "11ed48476c9b055b88644b35f89b6fbb",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed48476c9b055b88644b35f89b6fbb",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4dbc97ec762bb52fa3952e31d8ba",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4ba6151cb3229cd31523377c35da",
          },
          {
            from: "11ed4af99a7f4f8e9cd365b61fcdeb4c",
            to: "11ed4ba6151cb3229cd31523377c35da",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed55a817415e6bbf8dfdf50d0ca358",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4ba6151cb3229cd31523377c35da",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4dbc97ec762bb52fa3952e31d8ba",
          },
          {
            from: "11ed4af7c40f7bce9cd36d65b52859f3",
            to: "11ed4ba6151cb3229cd31523377c35da",
          },
          {
            from: "11ed493c21c44723ad41113e97b679bc",
            to: "11ed4a9c71b95bd4ba124fc11388f162",
          },
          {
            from: "11ed4ba1174a0cf29cd3a75ac9105b64",
            to: "11ed4ba3f25543b99cd3993ff27c0af0",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed47a0802104118b0c71da0524036d",
          },
          {
            from: "11ed492a61c3a865ad4113e6d7500e5c",
            to: "11ed4a9c71b95bd4ba124fc11388f162",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4ba6151cb3229cd31523377c35da",
          },
          {
            from: "11ed4af4fc65835d9cd363e711dc958a",
            to: "11ed4ba3f25543b99cd3993ff27c0af0",
          },
          {
            from: "11ed4f800af6adea8c96b1b4cad18b89",
            to: "11ed4a9c71b95bd4ba124fc11388f162",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4af99a7f4f8e9cd365b61fcdeb4c",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed55a817415e6bbf8dfdf50d0ca358",
          },
          {
            from: "11ed4af99a7f4f8e9cd365b61fcdeb4c",
            to: "11ed55a817415e6bbf8dfdf50d0ca358",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed55a817415e6bbf8dfdf50d0ca358",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4ba3f25543b99cd3993ff27c0af0",
          },
          {
            from: "11ed494228b84f31ad416faaaf225897",
            to: "11ed4ba1174a0cf29cd3a75ac9105b64",
          },
          {
            from: "11ed47a0802104118b0c71da0524036d",
            to: "11ed492a61c3a865ad4113e6d7500e5c",
          },
          {
            from: "11ed4e125645dbb4b52fd7f035ea70fc",
            to: "11ed4ba1174a0cf29cd3a75ac9105b64",
          },
          {
            from: "11ed4b9f592e67ef9cd3c956ea3234c4",
            to: "11ed4ba1174a0cf29cd3a75ac9105b64",
          },
          {
            from: "11ed4e1108307f93b52f711949535c39",
            to: "11ed492a61c3a865ad4113e6d7500e5c",
          },
          {
            from: "11ed4afedad05b8e9cd399039b1e1a8c",
            to: "11ed4ba1174a0cf29cd3a75ac9105b64",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4ba1174a0cf29cd3a75ac9105b64",
          },
          {
            from: "11ed47b4c7570e618b0c45ab5d9c9a58",
            to: "11ed4b9f592e67ef9cd3c956ea3234c4",
          },
          {
            from: "11ed4afd64bb489a9cd3b948743abeb7",
            to: "11ed4b9f592e67ef9cd3c956ea3234c4",
          },
          {
            from: "11ed47c52ae7b1b48b0c31aa6af07f27",
            to: "11ed4b9f592e67ef9cd3c956ea3234c4",
          },
        ],
        points: [
          {
            id: "11ed4af4fc65835d9cd363e711dc958a",
            level: 1,
            name: "0901税金假设表",
            tip: "0901税金假设表 11ed4af4fc65835d9cd363e711dc958a",
          },
          {
            id: "11ed4ba1174a0cf29cd3a75ac9105b64",
            level: 2,
            name: "0908跨期分摊后成本",
            tip: "0908跨期分摊后成本 11ed4ba1174a0cf29cd3a75ac9105b64",
          },
          {
            id: "11ed4e125645dbb4b52fd7f035ea70fc",
            level: 2,
            name: "1003项目各期利润预算（报表口径）",
            tip: "1003项目各期利润预算（报表口径） 11ed4e125645dbb4b52fd7f035ea70fc",
          },
          {
            id: "11ed4a9c71b95bd4ba124fc11388f162",
            level: 6,
            name: "0703前期及工程成本支付计划",
            tip: "0703前期及工程成本支付计划 11ed4a9c71b95bd4ba124fc11388f162",
          },
          {
            id: "11ed493c21c44723ad41113e97b679bc",
            level: 1,
            name: "9902版本属性维护表",
            tip: "9902版本属性维护表 11ed493c21c44723ad41113e97b679bc",
          },
          {
            id: "11ed4e1108307f93b52f711949535c39",
            level: 4,
            name: "1002项目整体利润表_按年（报表口径）",
            tip: "1002项目整体利润表_按年（报表口径） 11ed4e1108307f93b52f711949535c39",
          },
          {
            id: "11ed493d0b698245ad41abb48157cfe0",
            level: 1,
            name: "9903组织属性维护表",
            tip: "9903组织属性维护表 11ed493d0b698245ad41abb48157cfe0",
          },
          {
            id: "11ed47a0802104118b0c71da0524036d",
            level: 2,
            name: "0301开发节奏（项目）",
            tip: "0301开发节奏（项目） 11ed47a0802104118b0c71da0524036d",
          },
          {
            id: "11ed4f756b0e24218c9693317591e101",
            level: 1,
            name: "1502收购前项目利润表（报表口径）",
            tip: "1502收购前项目利润表（报表口径） 11ed4f756b0e24218c9693317591e101",
          },
          {
            id: "11ed494228b84f31ad416faaaf225897",
            level: 3,
            name: "0702土地费用业态明细",
            tip: "0702土地费用业态明细 11ed494228b84f31ad416faaaf225897",
          },
          {
            id: "11ed47c52ae7b1b48b0c31aa6af07f27",
            level: 2,
            name: "0202面积指标（分期业态）",
            tip: "0202面积指标（分期业态） 11ed47c52ae7b1b48b0c31aa6af07f27",
          },
          {
            id: "11ed4afd64bb489a9cd3b948743abeb7",
            level: 1,
            name: "0904主数据分期和清算分期对应关系",
            tip: "0904主数据分期和清算分期对应关系 11ed4afd64bb489a9cd3b948743abeb7",
          },
          {
            id: "11ed4ba6151cb3229cd31523377c35da",
            level: 3,
            name: "0910土增税预缴",
            tip: "0910土增税预缴 11ed4ba6151cb3229cd31523377c35da",
          },
          {
            id: "11ed4f800af6adea8c96b1b4cad18b89",
            level: 1,
            name: "1503收购前项目现金流量表",
            tip: "1503收购前项目现金流量表 11ed4f800af6adea8c96b1b4cad18b89",
          },
          {
            id: "11ed55091757096abf8d9bf316d877f7",
            level: 2,
            name: "1005已售未结毛利结转表（报表口径）",
            tip: "1005已售未结毛利结转表（报表口径） 11ed55091757096abf8d9bf316d877f7",
          },
          {
            id: "11ed4f7322c607d78c968fb192178199",
            level: 1,
            name: "1501收并购前销售及结转表",
            tip: "1501收并购前销售及结转表 11ed4f7322c607d78c968fb192178199",
          },
          {
            id: "11ed55a817415e6bbf8dfdf50d0ca358",
            level: 3,
            name: "0915税金支付明细表_过渡",
            tip: "0915税金支付明细表_过渡 11ed55a817415e6bbf8dfdf50d0ca358",
          },
          {
            id: "11ed4dbe79b5dcc5b52f8f21fbfcb471",
            level: 5,
            name: "0913企业所得税（报表口径）",
            tip: "0913企业所得税（报表口径） 11ed4dbe79b5dcc5b52f8f21fbfcb471",
          },
          {
            id: "11ed4dbc97ec762bb52fa3952e31d8ba",
            level: 2,
            name: "0911视同销售",
            tip: "0911视同销售 11ed4dbc97ec762bb52fa3952e31d8ba",
          },
          {
            id: "11ed47a716495ad78b0c5dd3411e5ae6",
            level: 1,
            name: "0302开发节奏（楼栋）",
            tip: "0302开发节奏（楼栋） 11ed47a716495ad78b0c5dd3411e5ae6",
          },
          {
            id: "11ed492a61c3a865ad4113e6d7500e5c",
            level: 5,
            name: "0105其他财务假设",
            tip: "0105其他财务假设 11ed492a61c3a865ad4113e6d7500e5c",
          },
          {
            id: "11ed492d892d80efad4113b58d3f9794",
            level: 1,
            name: "0501品牌使用费、包干费结余、担保费情况",
            tip: "0501品牌使用费、包干费结余、担保费情况 11ed492d892d80efad4113b58d3f9794",
          },
          {
            id: "11ed4abf5c518a5eab6c79ca1c2f3745",
            level: 3,
            name: "0802收入结转表（报表口径）",
            tip: "0802收入结转表（报表口径） 11ed4abf5c518a5eab6c79ca1c2f3745",
          },
          {
            id: "11ed4e1372ab7e7eb52f51859441d9af",
            level: 2,
            name: "1004签约利润表（报表口径）",
            tip: "1004签约利润表（报表口径） 11ed4e1372ab7e7eb52f51859441d9af",
          },
          {
            id: "11ed4b9f592e67ef9cd3c956ea3234c4",
            level: 2,
            name: "0907需跨期成本_分摊明细表",
            tip: "0907需跨期成本_分摊明细表 11ed4b9f592e67ef9cd3c956ea3234c4",
          },
          {
            id: "11ed4af99a7f4f8e9cd365b61fcdeb4c",
            level: 2,
            name: "0905清算业态拆分比例",
            tip: "0905清算业态拆分比例 11ed4af99a7f4f8e9cd365b61fcdeb4c",
          },
          {
            id: "11ed4ab9eb45ab74ab6cfffb1df92105",
            level: 4,
            name: "0704项目成本预算表（报表口径）",
            tip: "0704项目成本预算表（报表口径） 11ed4ab9eb45ab74ab6cfffb1df92105",
          },
          {
            id: "11ed4af7c40f7bce9cd36d65b52859f3",
            level: 1,
            name: "0903土增税税率假设",
            tip: "0903土增税税率假设 11ed4af7c40f7bce9cd36d65b52859f3",
          },
          {
            id: "11ed4afedad05b8e9cd399039b1e1a8c",
            level: 1,
            name: "0906不跨期成本_不可扣除成本明细表",
            tip: "0906不跨期成本_不可扣除成本明细表 11ed4afedad05b8e9cd399039b1e1a8c",
          },
          {
            id: "11ed4dc090179ed3b52f1b5e2b8a58bf",
            level: 5,
            name: "0914税金支付明细表（报表口径）",
            tip: "0914税金支付明细表（报表口径） 11ed4dc090179ed3b52f1b5e2b8a58bf",
          },
          {
            id: "11ed5694755b7571bf8d3117534e83dc",
            level: 2,
            name: "0803收入结转表（报表口径）过渡表",
            tip: "0803收入结转表（报表口径）过渡表 11ed5694755b7571bf8d3117534e83dc",
          },
          {
            id: "11ed4dbd5336ef2ab52f0b5eef368153",
            level: 6,
            name: "0912土增税全盘清算",
            tip: "0912土增税全盘清算 11ed4dbd5336ef2ab52f0b5eef368153",
          },
          {
            id: "11ed49284dc9e611ad41e792b5469257",
            level: 2,
            name: "0503管理费用明细表",
            tip: "0503管理费用明细表 11ed49284dc9e611ad41e792b5469257",
          },
          {
            id: "11ed4abe2b86a759ab6c7bc118077866",
            level: 2,
            name: "0801结转假设表",
            tip: "0801结转假设表 11ed4abe2b86a759ab6c7bc118077866",
          },
          {
            id: "11ed47b4c7570e618b0c45ab5d9c9a58",
            level: 1,
            name: "0401销售及回款计划",
            tip: "0401销售及回款计划 11ed47b4c7570e618b0c45ab5d9c9a58",
          },
          {
            id: "11ed48476c9b055b88644b35f89b6fbb",
            level: 4,
            name: "0502营销费用明细表",
            tip: "0502营销费用明细表 11ed48476c9b055b88644b35f89b6fbb",
          },
          {
            id: "11ed4ba3f25543b99cd3993ff27c0af0",
            level: 3,
            name: "0909清算业态间成本分摊",
            tip: "0909清算业态间成本分摊 11ed4ba3f25543b99cd3993ff27c0af0",
          },
        ],
        scc: [
          [
            "11ed4ba1174a0cf29cd3a75ac9105b64",
            "11ed4e125645dbb4b52fd7f035ea70fc",
            "11ed492a61c3a865ad4113e6d7500e5c",
            "11ed4abf5c518a5eab6c79ca1c2f3745",
            "11ed4a9c71b95bd4ba124fc11388f162",
            "11ed4e1108307f93b52f711949535c39",
            "11ed4ab9eb45ab74ab6cfffb1df92105",
            "11ed4dbe79b5dcc5b52f8f21fbfcb471",
            "11ed4dc090179ed3b52f1b5e2b8a58bf",
            "11ed48476c9b055b88644b35f89b6fbb",
            "11ed4dbd5336ef2ab52f0b5eef368153",
            "11ed4ba3f25543b99cd3993ff27c0af0",
          ],
        ],
      },
      //由json转化的G6的数据
      data: null, //SCC + 非SCC 节点的数据
      data2: null, //SCC 节点的数据
      data3: null, //非SCC 节点的数据
      data4: [], //无数据
      graph: null, //G6的实例
      isShowEditor: false,
      isShowAdjustSpace: false,
      isShowClickNode: false,
      value1: "line",
      value2: "line",
      clickNode: {
        id: null,
        name: null,
        level: null,
      },
      checkSCC: true,
      checkNotSCC: true,
      distanceX: 600,
      distanceY: 600,
      nodeWidth: 400,
      nodeHeight: 100,
      fontSize: 30,
      options1: [
        {
          label: "直线",
          value: "line",
        },
        {
          label: "曲线",
          value: "quadratic",
        },
        {
          label: "折线",
          value: "polyline",
        },
        {
          label: "圆弧",
          value: "arc",
        },
        {
          label: "隐藏",
          value: "hide",
        },
      ],
      options2: [
        {
          label: "直线",
          value: "line",
        },
        {
          label: "曲线",
          value: "quadratic",
        },
        {
          label: "折线",
          value: "polyline",
        },
        {
          label: "圆弧",
          value: "arc",
        },
      ],
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
      let nodes2 = [];
      let nodes3 = [];
      let floorMax = 0;
      arr.forEach((p) => {
        floorMax = floorMax > p.length ? floorMax : p.length;
      });
      for (let i = 0; i < arr.length; i++) {
        //计算每个node的坐标
        y = this.distanceY * (i + 1);
        for (let j = 0; j < arr[i].length; j++) {
          x = this.distanceX * (j + 1 + (floorMax - arr[i].length) / 2);
          //检查是否是scc节点
          let isSccNode = false;
          this.jsonEditor.scc.forEach((p) => {
            p.forEach((q) => {
              if (arr[i][j].id == q) {
                isSccNode = true;
              }
            });
          });
          let obj;
          if (isSccNode) {
            obj = {
              id: arr[i][j].id,
              x,
              y,
              label: arr[i][j].name,
              conf: arr[i][j].tip,
              style: {
                fill: "#D8BFD8",
              },
            };
          } else {
            obj = {
              id: arr[i][j].id,
              x,
              y,
              label: arr[i][j].name,
              conf: arr[i][j].tip,
            };
          }

          nodes.push(obj);
          if (isSccNode) {
            nodes2.push(obj);
          } else {
            nodes3.push(obj);
          }
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
            },
            // label: `${p.from}->${p.to}`,
            // labelCfg:{
            //   style:{
            //     fontSize:25,
            //   }
            // }
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
        nodes: nodes,
        edges: edges,
      };
      this.data2 = {
        nodes: nodes2,
        edges: edges,
      };
      this.data3 = {
        nodes: nodes3,
        edges: edges,
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
          type: "rect",
          size: [parseInt(this.nodeWidth), parseInt(this.nodeHeight)],
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
            lineWidth: 4,
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

        //展示点击节点信息
        this.showClickNode(e.item._cfg.id);
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
            size: [parseInt(this.nodeWidth), parseInt(this.nodeHeight)],
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

        //数据更新后 根据checkbox的选项再渲染一次
        this.onChange();
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

        //数据更新后 根据checkbox的选项再渲染一次
        this.onChange();
      }, 0);
    },
    //修改向下的线
    //value 和 this.value1是相同的
    //使用graph.data更新data,然后render,发现这些配置还在?
    //因为data1234的里面重复的node都用的同一个对象,而这里把data里的对象改了
    handleChange1(value) {
      //更新边的配置

      if (value == "hide") {
        this.graph.edge((edge) => {
          if (edge.style.stroke == "grey") {
            return {
              type: "line", //这里value等于hide 隐藏后不关心样式 直接设置为line
              style: {
                opacity: 0, // 边透明度
              },
            };
          } else {
            return {
              type: this.value2,
              style: {
                opacity: this.value2 == "hide" ? 0 : 0.6, // 边透明度
              },
            };
          }
        });
      } else {
        this.graph.edge((edge) => {
          //根据颜色判断是向上还是向下
          if (edge.style.stroke == "grey") {
            return {
              type: value,
              style: {
                opacity: 0.6, // 边透明度
              },
            };
          } else {
            return {
              type: this.value2,
              style: {
                opacity: 0.6, // 边透明度
              },
            };
          }
        });
      }
      this.graph.render();
    },
    handleChange2(value) {
      this.graph.edge((edge) => {
        //根据颜色判断是向上还是向xia
        if (edge.style.stroke == "grey") {
          return {
            type: this.value1, //如果value1是hide,由于g6没有hide,会隐藏,达到同样的效果
          };
        } else {
          return {
            type: value,
          };
        }
      });
      this.graph.render();
    },
    //由点击节点触发
    showClickNode(id) {
      this.isShowClickNode = true;
      //弹出右侧框
      this.$refs.showNode.style.right = 0 + "px";
      let node;
      this.jsonEditor.points.forEach((p) => {
        if (id == p.id) {
          node = p;
        }
      });
      this.clickNode.id = node.id;
      this.clickNode.name = node.name;
      this.clickNode.level = node.level;
    },
    //由点击按钮触发
    showClickNodeButton() {
      this.isShowClickNode = !this.isShowClickNode;
      if (this.isShowClickNode) {
        this.$refs.showNode.style.right = 0 + "px";
      } else {
        this.$refs.showNode.style.right = -300 + "px";
      }
    },
    //点击checkbox触发 显示相应数据
    onChange() {
      let data = [];
      if (this.checkSCC) {
        if (this.checkNotSCC) {
          data = this.data;
        } else {
          data = this.data2;
        }
      } else {
        if (this.checkNotSCC) {
          data = this.data3;
        } else {
          data = this.data4;
        }
      }
      // 读取数据
      this.graph.data(data);
      // 渲染图
      this.graph.render();
    },
    onChangeSCC() {
      this.checkSCC = !this.checkSCC;
      this.onChange();
    },
    onChangeNotSCC() {
      this.checkNotSCC = !this.checkNotSCC;
      this.onChange();
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

.showNode {
  position: absolute;
  z-index: 999;
  transition: 0.3s;
  right: -300px;
  top: 500px;
}

.showNode div {
  word-break: break-all;
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

.menu2 {
  position: absolute;
  right: 20px;
  top: 60px;
  display: flex;
  z-index: 9999;
  height: 30px;
  justify-content: space-around;
  align-items: center;
}

.menu2 .ant-checkbox-wrapper {
  margin-right: 8px;
}

.menu .ant-btn,
.menu .ant-select {
  margin-right: 20px;
}

.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}

.selectLabel {
  line-height: 30px;
  margin-right: 4px;
}
</style>
