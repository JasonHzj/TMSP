<template>
  <div class="newbox">
    <div class="container-fluid">
      <div class="row">
        <div class="bs-example" data-example-id="navbar-form">
          <div class="navbar navbar-default">
            <div class="jeitem">
              <div class="block">
                  <el-select v-model="valuec" placeholder="请选择HP">
                  <el-option
                    v-for="item in options1"
                    :key="item.spmb"
                    :label="item.name"
                    :value="item.spmb"
                  ></el-option>
                </el-select>
                <el-select v-model="valuec" placeholder="请选择LP">
                  <el-option
                    v-for="item in options"
                    :key="item.spmb"
                    :label="item.name"
                    :value="item.spmb"
                  ></el-option>
                  </el-select>
                
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
                <el-button type="primary" @click="roder">确认</el-button>
                 <!-- <el-button type="text"  @click="open">点击打开 Message Box</el-button> -->
                 <el-button :class="'buttonck'" ><a href='https://sycm.taobao.com' target='_blank'>登入</a></el-button>
                 <!-- <el-input :id="'input'" v-model="input" placeholder="请输入内容"></el-input> -->
              </div>
            </div>
          </div>
        </div>
        <div id="main" style="width:100%;height: 600px;"></div>
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>统计时段</th>
              <th>浏览量</th>
              <th>访客数</th>
              <th>点击次数</th>
              <th>点击人数</th>
              <th>点击率</th>
              <th>跳失率</th>
              <th>平均停留时长（秒）</th>
              <th>引导下单金额</th>
              <th>引导下单买家数</th>
              <th>引导下单转化率</th>
              <th>引导支付金额</th>
              <th>引导支付买家数</th>
              <th>引导支付转化率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lista" :key="item.traceId">
              <td>{{ item.date }}</td>
              <td>{{ item.pv }}</td>
              <td>{{ item.uv }}</td>
              <td>{{ item.clickCnt }}</td>
              <td>{{ item.clickUv }}</td>
              <td>{{ item.clickRate | toPercent}}</td>
              <td>{{ item.bounceRate | toPercent}}</td>
              <td>{{ item.avgStayTime | numFilter}}</td>
              <td>{{ item.leOrderAmt | numFilter}}</td>
              <td>{{ item.leOrderBuyerCnt }}</td>
              <td>{{ item.leOrderRate | toPercent}}</td>
              <td>{{ item.lePayAmt | numFilter}}</td>
              <td>{{ item.lePayBuyerCnt }}</td>
              <td>{{ item.lePayRate | toPercent}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
       input: '',
      bb:[100,200],
       uvL: [],
       pvL: [],
       avgStayTimeL: [],
       clickCntL: [],
       clickUvL: [],
       leOrderAmtL: [],
       leOrderBuyerCntL: [],
       lePayAmtL: [],
       lePayBuyerCntL: [],
       clickRateL: [],
       leOrderRateL: [],
       lePayRateL: [],
       bounceRateL: [],
       dateL: [],
       options1:[],
      options: [],
      valuec: "",
      valuec1: "",
      lista: [],
      newLista: [],
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
      value2: "",
      charts: "",
      
     
      
    };
  },
  created() {
    this.lpList();
    this.hpList();
    
  },
  //https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?spmb=shop/activity_3265150369_210730499&appType=20&startDate=2019-07-13&endDate=2019-08-11
  //https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?type=1&objId=-9999&spmb=-9999&appType=20&startDate=2019-07-16&endDate=2019-08-14&dateType=recent30&dateRange=2019-07-16%7C2019-08-14&indexCode=uv%2CclickUv%2CbounceRate&_=1565872604191&token=d4015fd57
  //https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?spmb=-9999&appType=20&startDate=2019-07-16&endDate=2019-08-14 首页
  //'apis/bda/decorate/wl/getGeneralTrend.json?appType=20&endDate='+ this.value2 + '&spmb=shop/activity_3265150369_120344067&startDate=' + this.value1
  methods: {
    //获取HP数据
    hpList(){
      this.$http.get('apis/bda/decorate/wl/config/listAddedPages.json').then(result =>{
         if (result.body.code === 0) {
         this.options1 = result.body.data.customHomepage;
         console.log(this.options1);
         }else{
           console.log("获取数据失败");
         }
     
      })
    },
    //获取LP列表
    lpList(){
      this.$http.get('apis/bda/decorate/wl/config/listAddedPages.json').then(result => {
         if (result.body.code === 0) {
         this.options = result.body.data.list;
         console.log(this.options);
         }else{
           console.log("获取数据失败");
         }
      })
    },

    roder() {
      var time = moment(this.value2[0]).format("YYYY-MM-DD");
      var time1 = moment(this.value2[1]).format("YYYY-MM-DD");
      this.$http
        .get(
          "apis/bda/decorate/wl/getGeneralTrend.json?appType=20&endDate=" +
            time1 +
            "&spmb=" +
            this.valuec +
            "&startDate=" +
            time
        )
        .then(result => {
          if (result.body.code === 0) {
            this.lista = result.body.data.list;
            console.log(this.lista);
           
            this.lista.forEach(item => {
              this.uvL.push(item.uv);
              this.pvL.push(item.pv);
              this.avgStayTimeL.push(this.$options.filters.numFilter(item.avgStayTime));
              this.clickCntL.push(item.clickCnt);
              this.clickUvL.push(item.clickUv);
              this.leOrderAmtL.push(this.$options.filters.numFilter(item.leOrderAmt));
              this.leOrderBuyerCntL.push(item.leOrderBuyerCnt);
              this.lePayAmtL.push(this.$options.filters.numFilter(item.lePayAmt));
              this.lePayBuyerCntL.push(item.lePayBuyerCnt);
              this.clickRateL.push(this.$options.filters.toPercent(item.clickRate));
              this.leOrderRateL.push(this.$options.filters.toPercent(item.leOrderRate));
              this.lePayRateL.push(this.$options.filters.toPercent(item.lePayRate));
              this.bounceRateL.push(this.$options.filters.toPercent(item.bounceRate));
              this.dateL.push(item.date);
            });

            this.uvL.map(Number);
            this.pvL.map(Number);
            this.clickCntL.map(Number);
            this.clickUvL.map(Number);
            this.leOrderBuyerCntL.map(Number);
            this.lePayBuyerCntL.map(Number);

            console.log(this.uvL);
            console.log(this.dateL);
          } else {
            console.log("获取数据失败");
          }
        });
        setTimeout(() =>{
    
   this.drawPie("main");
},300);
    

      console.log(this.valuec);
      console.log(time1);
    },
      drawPie(id){
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "点击次数"
        },
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['点击次数','平均停留时长']
    },
    xAxis: [
        {
            type: 'category',
            data: this.dateL,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '点击次数',
            min: 0,
            max: 60000,
            interval: 10000,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '平均停留时长',
            min: 0,
            max: 10,
            interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
      series: [
        {
            name:'点击次数',
            type:'bar',
            data: this.clickCntL,
             markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          }
        },
        {
            name:'平均停留时长',
            type:'line',
            yAxisIndex: 1,
            data: this.avgStayTimeL,
             markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          }
        }
      ]
      });
    },
      open() {
        this.$alert('', '文本框', {
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
.buttonck{ float: right; margin-right: 10px;}
</style>
