module.exports = {
  proxy: {
    '/apis': { //将www.exaple.com印射为/apis
      target: 'https://tmc.sale.tmall.com', // 接口域名
      secure: true, // 如果是https接口，需要配置这个参数
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apis': '' //需要rewrite的,
      },
      onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('cookie', 'cna=82biFaMJOz0CAbSohvJkWDnH; lid=victoriassecret%E5%AE%98%E6%96%B9%E6%97%97%E8%88%B0%E5%BA%97; _m_h5_tk=5c7629abcc6dbb2e63a5843e9e671ac4_1566295662944; _m_h5_tk_enc=c562bc57091ac2dfbf2387e3cdc4df2e; enc=Z6Chklpr7o2fpYEtsAdQiUxH9CKtYaQI2XcfFKaXr%2BpwJ5zvntA3K0bj3nYm3U%2BwuO6yXLPr6dyE85NgEq1jsg%3D%3D; dnk=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; uc1=pas=0&tmb=1&tag=8&lng=zh_CN&cookie16=W5iHLLyFPlMGbLDwA%2BdvAGZqLg%3D%3D&cookie14=UoTaHo52dkN9qA%3D%3D&cookie21=URm48syIZJwTkNGk7eanmw%3D%3D&existShop=true&cookie15=UIHiLt3xD8xYTw%3D%3D; uc3=id2=UNJXw5Nj2KrAIg%3D%3D&vt3=F8dBy3MOSNa3NSfRxyI%3D&lg2=UIHiLt3xD8xYTw%3D%3D&nk2=Fb76GdtHDDckDrAwpVK5XhjmbQBv%2BEZTwQ%3D%3D; tracknick=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; _l_g_=Ug%3D%3D; uc4=id4=0%40UgXQyd2Vywuq2hL1Ecnb%2Fd5y17Mc&nk4=0%40Fw%2BoE4cciBqSEWxnax1ZdjGrkUIwTJnHQ8%2F0ni74DJX4rGLU; unb=3265150369; lgc=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; cookie1=BqQhuWH15zr%2BHONH5VqktzgYSYJcEzUh5tN2BKntLz0%3D; login=true; cookie17=UNJXw5Nj2KrAIg%3D%3D; cookie2=7f6af964dbc1c78467a84de4d94bc951; _nk_=victoriassecret%5Cu5B98%5Cu65B9%5Cu65D7%5Cu8230%5Cu5E97; sg=%E5%BA%9799; t=27a46c0979ff546740ed7bf82d1e1908; csg=902ba39c; _tb_token_=566fee6e73e9; l=cBE9Tvkuv2h0TC86KOCiNZsf3KQ9sIRAguWfG-9pi_5It6815rbOkJvM6FJ6cjWdOxYB4aVvW6y9-etkiy5wmLYys4AC.; isg=BDEx6dtCyJ87B2V1YBTD_u2nQL3BFs-ihWWeyRNGLPgXOlGMW2qDYWlcXI758j3I');
      }
      
    }
  }
}
