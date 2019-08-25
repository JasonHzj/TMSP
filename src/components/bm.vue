<template>
  <div class="newbox">
    <div class="container-fluid">
      <div class="row">
        <div class="bs-example" data-example-id="navbar-form">
          <div class="navbar navbar-default">
            <div class="jeitem">
              <div class="block">
                <el-select v-model="valuec" placeholder="请选择LP">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-input :class="'inputId'" v-model="input" placeholder="请输入总页数"></el-input>

                <el-button type="primary" @click="roder">确认</el-button>
                <!-- <el-button type="text"  @click="open">点击打开 Message Box</el-button> -->
                <el-button :class="'buttonck'">
                  <a href="https://sycm.taobao.com" target="_blank">登入</a>
                </el-button>
                <el-button type="primary" @click="handleDownload">下载</el-button>
                <!-- <el-input :id="'input'" v-model="input" placeholder="请输入内容"></el-input> -->
              </div>
            </div>
          </div>
        </div>
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>商品ID</th>
              <th>商品名称</th>
              <th>商品状态</th>
              <th>一口价</th>
              <th>专柜价</th>
              <th>活动价格</th>
              <th>预计普惠成交价</th>
              <th>最低成交价</th>
              <th>商品价格力</th>
              <th>活动状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lista" :key="item.traceId">
              <td>{{ item.itemId }}</td>
              <td>{{ item.itemName }}</td>
              <td>{{ item.icStatusName }}</td>
              <td>{{ item.originalPrice }}</td>
              <td>{{ item.activityTagPriceMax }}</td>
              <td>{{ item.activityPrice }}</td>
              <td>{{ item.dealPriceMax }}</td>
              <td>{{ item.lowestDealPriceMin }} ~ {{ item.lowestDealPriceMax }}</td>
              <td>{{ item.priceLevelName }} <br/> {{ item.priceLevelMessage}}</td>
              <td>{{ item.statusName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import { isArray } from "util";

export default {
  name: "",
  data() {
    return {
      lista: [],
      valuec: "",
      options: [],
      input: "",
      ovced:[]
    };
  },
  created() {
    this.lpList();
  },
  methods: {
    //获取HP数据
    //https://tmc.sale.tmall.com/list/queryListData.do?code=itemList&signRecordId=101309267&currentPage=1
    //https://tmc.sale.tmall.com/activity/detail/queryComponentData.do?scene=marketProgram&mainComponentId=stepList&componentId=spotItem&campaignId=23395
    async lpList() {
      await this.$http
        .get("apis/campaign/queryCampaignList.do?currentPage=1&tab=2")
        .then(result => {
          if (result.body.success = "true") {
            this.options = result.body.campaignList;
          } else {
            console.log("获取数据失败");
          }
        });
         
    },
    async getbm() {
          await  this.$http
        .get(
          "apis/activity/detail/queryComponentData.do?scene=marketProgram&mainComponentId=stepList&componentId=spotItem&campaignId=" + this.valuec )
        .then(result => {
          if (result.body.success = true) {
            this.ovced = result.body.data.rhythmList[0].tabs[0].signRecordId;
          } else {
            console.log("获取数据失败");
          }
        });
        console.log(this.ovced)
       
    },
    async roder() {
         
      await this. getbm();
       var csc = parseInt(this.input)
       console.log(csc)
      for (var i = 1; i <= csc; i++) {
        var ced = [i]
         this.$http
          .get(
            "apis/list/queryListData.do?code=itemList&signRecordId="+ this.ovced +"&currentPage=" + ced)
          .then(res => {
            if (res.body.success == true) {
               var acee = res.body.data.list;
               for (var i = 0; i < acee.length; i++) {
                  var dcd = acee[i];                  
                    this.lista.push(JSON.parse(JSON.stringify(dcd)));
            } 
            }
            else {
              console.log("获取商品详情失败");
            }
          });
      } //
        console.log(this.ovced)
      console.log(this.lista);
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("vendor/Export2Excel");
        const tHeader = ["商品ID", "商品名称", "商品状态", "一口价", "专柜价","活动价格","预计普惠成交价","最低成交价1","最低成交价2","商品价格力等级","商品价格力详情","活动状态"];
        const filterVal = [
          "itemId",
          "itemName",
          "icStatusName",
          "originalPrice",
          "activityTagPriceMax",
          "activityPrice",
          "dealPriceMax",
          "lowestDealPriceMin",
          "lowestDealPriceMax",
          "priceLevelName",
          "priceLevelMessage",
          "statusName"
        ];
        const list = this.lista;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel");
      });
    },
    // 参数过滤
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>


<style>
.el-date-editor .el-range-separator {
  width: 9%;
}
.navbar-default {
  padding: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.newbox .el-select {
  margin-right: 40px;
}
#main {
  margin-bottom: 20px;
}
.buttonck {
  float: right;
  margin-right: 10px;
}
.inputId {
  width: 20%;
  margin-right: 10px;
}
</style>
