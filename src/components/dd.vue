<template>
  <div class="newbox">
    <div class="container-fluid">
      <div class="row">
        <div class="bs-example" data-example-id="navbar-form">
          <div class="navbar navbar-default">
            <div class="jeitem">
              <div class="block">
                <el-input
                  :class="'inputId'"
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="textarea1"
                ></el-input>

                <span class="demonstration">日期：</span>
                <el-date-picker
                  v-model="value2"
                  type="daterange"
                  align="right"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
                <el-date-picker type="dates" v-model="value4" placeholder="选择一个或多个日期"></el-date-picker>
                <el-button type="primary" @click="roder">确认</el-button>
                <!-- <el-button type="text"  @click="open">点击打开 Message Box</el-button> -->
                <el-button :class="'buttonck'">
                  <a href="https://sycm.taobao.com" target="_blank">登入</a>
                </el-button>
                <!-- <el-input :id="'input'" v-model="input" placeholder="请输入内容"></el-input> -->
              </div>
            </div>
          </div>
        </div>
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <!-- <th>统计日期</th>
              <th>商品ID</th>
              <th>商品名称</th>-->
              <th>SKUID</th>
              <th>加购件数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lista" :key="item.traceId">
              <!-- <td>{{ item.time1 }}</td>
              <td>{{ item.pv }}</td>
              <td>{{ item.uv }}</td>-->
              <td>{{ item.skuName }}</td>
              <td>{{ item.skuNewAddCartItemCnt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";

export default {
  name: "",
  data() {
    return {
      value4: "",
      textarea1: "",
      inputId: [],
      timeSome: [],
      input: "",
      lista: [],
      idList: [],
      titleList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: ""
    };
  },
  created() {},
  //https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?spmb=shop/activity_3265150369_210730499&appType=20&startDate=2019-07-13&endDate=2019-08-11
  //https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?type=1&objId=-9999&spmb=-9999&appType=20&startDate=2019-07-16&endDate=2019-08-14&dateType=recent30&dateRange=2019-07-16%7C2019-08-14&indexCode=uv%2CclickUv%2CbounceRate&_=1565872604191&token=d4015fd57
  //https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?spmb=-9999&appType=20&startDate=2019-07-16&endDate=2019-08-14 首页
  //'apis/bda/decorate/wl/getGeneralTrend.json?appType=20&endDate='+ this.value2 + '&spmb=shop/activity_3265150369_120344067&startDate=' + this.value1
  methods: {
    //获取HP数据

    //https://sycm.taobao.com/bda/items/itemanaly/sku/getSalesDetails.json?dateRange=2019-08-19%7C2019-08-19&dateType=recent1&device=0&itemId=600500183210&order=desc&page=1&pageLimit=500
    //https://sycm.taobao.com/cc/cockpit/marcro/item/top.json?dateRange=2019-08-19%7C2019-08-19&dateType=day&pageSize=2000&page=1&order=desc&orderBy=payAmt&device=0

    roder() {
      var time = moment(this.value2[0]).format("YYYY-MM-DD");
      var time1 = moment(this.value2[1]).format("YYYY-MM-DD");

      for (var i = 0; i < this.value4.length; i++) {
        this.timeSome.push(moment(this.value4[i]).format("YYYY-MM-DD"));
      }
      this.inputId = this.textarea1.split("\n");

      var tdInputid;
      this.inputId.forEach(element => {
        tdInputid = element;

        //获取商品详情
        this.$http
          .get("apis/cc/item/crowd/info.json?itemId=" + tdInputid)
          .then(res => {
            if (res.body.code === 0) {
              // this.idList.push(res.body.data.detailUrl);
              // this.titleList.push(res.body.data.title);

               for (var i = 0; i < this.timeSome.length; i++) {
          var someTime = this.timeSome[i];

          this.$http
            .get(
              "apis/bda/items/itemanaly/sku/getSalesDetails.json?dateRange=" +
                someTime +
                "%7C" +
                someTime +
                "&dateType=recent1&device=0&itemId=" +
                tdInputid +
                "&order=desc&page=1&pageLimit=500"
            )
            .then(result => {
              if (result.body.code === 0) {
                var acee = result.body.data.data;
                // result.body.data.data.forEach(item => {
                //   item.timeDate = time
                //   this.lista.push(item);
                //    console.log(item)
                // });

                console.log(acee);
                for (var i = 0; i < acee.length; i++) {
                  var dcd = acee[i];
                 
                    var jd = res.body.data.detailUrl;
                    var jc = res.body.data.title;
                    dcd.titleL = jc;
                    dcd.idL = jd;
                    this.lista.push(JSON.parse(JSON.stringify(dcd)));
                  
                }
              } else {
                console.log("获取数据失败");
              }
            });
          //for
        }
            } else {
              console.log("获取商品详情失败");
            }
          });

       
      });

      console.log(this.timeSome);
      console.log(this.titleList);
      console.log(this.lista);
    },

    open() {
      this.$alert("", "文本框", {
        dangerouslyUseHTMLString: true
      });
    }
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位，尾数四舍五入
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
    toPercent(point) {
      //小数转换百分比
      let str = Number(point * 100).toFixed(2);
      str += "%";
      return str;
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
