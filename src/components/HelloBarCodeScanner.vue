<template>
  <div>

    <img-inputer v-model="file" theme="light" size="small"/>
    <input type="file" @change="handleFileChange" ref="inputer" value="a" style="font-size:0px"/>
    <div class="scanner_wrapper">
      <button @click="stop">Stop</button>
      <BR/><BR/> <span>{{resultCodeInfo}}</span>
      <BR/> <span>{{resultcode}}</span>

      <BR/> <span>{{foundCodes}}</span>


      <div ref="quagga" class="camera"/>
      <pre v-if="data">
      {{ data }}
    </pre>
    </div>

    inputStream
  </div>
</template>

<script>
  import Quagga from 'quagga';
  import axios from 'axios';

  export default {
    data: () => ({
      fileUpload: "",
      data: null,
      resultcode: "-",
      resultCodeInfo: "-",
      foundCodes: new Map()
    }),

    mounted() {
      // this.$nextTick(() => {
      //   Quagga.init({
      //       inputStream: {
      //         name: "Live",
      //         type: "ImageStream",
      //         target: this.$refs.quagga,
      //         constraints: {
      //           width: 640,
      //           height: 480,
      //           deviceId: 0,
      //           facingMode: "environment",
      //         },
      //         area: {
      //           top: "0%",
      //           right: "0%",
      //           left: "0%",
      //           bottom: "0%",
      //         },
      //
      //       },
      //       debug: true,
      //       locator: {
      //         halfSample: true,
      //         patchSize: "medium", // x-small, small, medium, large, x-large
      //         debug: {
      //           showCanvas: true,
      //           showPatches: true,
      //           showFoundPatches: true,
      //           showSkeleton: true,
      //           showLabels: true,
      //           showPatchLabels: true,
      //           showRemainingPatchLabels: true,
      //           boxFromPatches: {
      //             showTransformed: true,
      //             showTransformedBox: true,
      //             showBB: true
      //           }
      //         }
      //       },
      //
      //       locate: true,
      //
      //       decoder: {
      //         readers: ["ean_reader"],
      //
      //       },
      //
      //     },
      //     () => this.start())
      // })
    },
    methods: {
      handleFileChange(e) {
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        let file = inputDOM.files[0];
        console.log(file);
        console.log(URL.createObjectURL(file));
        // this.errText = '';
        // Quagga.init({
        //   inputStream : {
        //     name : "Live",
        //     type : "ImageStream",
        //     target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
        //   },
        //   decoder : {
        //     readers : ["code_128_reader"]
        //   }
        // }, function(err) {
        //   if (err) {
        //     console.log(err);
        //     return
        //   }
        //   console.log("Initialization finished. Ready to start");
        //   Quagga.start();
        // });
        // let reader = new FileReader();
        // // 将图片将转成 base64 格式
        // reader.readAsDataURL(file);
        // // 读取成功后的回调
        // reader.onloadend = function () {
        //   console.log(this.result);
        //   const src = this.result;
        //   Quagga.decodeSingle({
        //     decoder: {
        //       readers: ["ean"] // List of active readers
        //     },
        //     locate: true, // try to locate the barcode in the image
        //     src: 'data:image/jpg;base64,' + src.substr(src.indexOf(',')+1),//URL.createObjectURL(file),
        //     // src: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%9D%A1%E5%BD%A2%E7%A0%81&step_word=&hs=0&pn=2&spn=0&di=106533245501&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=823405878%2C3443523694&os=568412607%2C3049456600&simid=4194346878%2C651564224&adpicid=0&lpn=0&ln=1958&fr=&fmq=1498811412680_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc2cec3fdfc0392452c51063a8694a4c27d1e251b.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fzit1w5_z%26e3Bkwt17_z%26e3Bv54AzdH3Fq7jfpt5gAzdH3Fcd8dadlcm_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0'//'data:image/jpg;base64,'+base64Data // or 'data:image/jpg;base64,' + data
        //   }, function(result){
        //     if(result) {
        //       if(result.codeResult) {
        //         console.log("result", result.codeResult.code);
        //       }
        //     }else{
        //       alert("未扫描成功!");
        //     }
        //   });
        // }

        Quagga.decodeSingle({
            // inputStream: {
            //   size: 800,
            //   singleChannel: false
            // },
            locator: {
              patchSize: "medium",
              halfSample: true
            },
            decoder: {
              readers: [{
                format: "ean_reader",
                config: {}
              }]
            },
            locate: true,
            src: URL.createObjectURL(file),//'data:image/jpg;base64,' + this.result,//'/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
          },
          function(result){
            console.log(result)
            if(result.codeResult) {
              console.log("result", result.codeResult.code);
            } else {
              console.log("not detected");
            }
          });

        // // 每次重新选择都需要进行对上一次的销毁
        // this.dataUrl && URL.revokeObjectURL(dataUrl)
        // this.file = inputDOM.files[0];
        // // 在获取到文件对象进行预览就行了！
        // this.imgPreview(this.file);
        //
        // 创建一个reader
        // let reader = new FileReader();
        // 将图片将转成 base64 格式
        // reader.readAsDataURL(file);
        // 读取成功后的回调
        // reader.onloadend = function () {
           // this.result;
          // console.log(this.result);
          // Quagga.decodeSingle({
          //   decoder: {
          //     readers: ["code_128_reader"] // List of active readers
          //   },
          //   locate: true, // try to locate the barcode in the image
          //   src: URL.createObjectURL(file),//'data:image/jpg;base64,' + this.result,//'/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
          // },
          //   function(result){
          //   if(result.codeResult) {
          //     console.log("result", result.codeResult.code);
          //   } else {
          //     console.log("not detected");
          //   }
          // });
        // }



        // let size = Math.floor(this.file.size / 1024);
        // if (size > ...) {
        //   // 这里可以加个文件大小控制
        //   return false
        // }

        // 触发这个组件对象的input事件
        // this.$emit('input', this.file);

        // 这里就可以获取到文件的名字了
        // this.fileName = this.file.name;

        // 这里加个回调也是可以的
        // this.onChange && this.onChange(this.file, inputDOM.value);

      },
      start() {
        Quagga.onDetected(this.onDetected)
        Quagga.start()
        console.log('Quagga started!')
        //this.getCodeInfo('46020480032')

      },
      onDetected(data) {
        this.data = data
        this.resultcode = data.codeResult.code + ' - ' + data.codeResult.startInfo.error
        if (this.foundCodes.has(data.codeResult.code)) {
          var val = this.foundCodes.get(data.codeResult.code);
          val++;
          this.foundCodes.set(data.codeResult.code, val);
        } else this.foundCodes.set(data.codeResult.code, 1);
        this.getCodeInfo(data.codeResult.code)
      },
      stop() {
        this.getfoundCodes();
        Quagga.offDetected(this.onDetected)
        Quagga.stop()
        this.$refs.quagga.querySelector('video').remove()
        this.$refs.quagga.querySelector('canvas').remove()
      },
      getCodeInfo(code) {
        var getinfoflag = false;
        for (let [key, value] of this.foundCodes) {     // get data sorted
          if (value > 10) {
            getinfoflag = true
          }
        }
        //console.log('getinfoflag='+ getinfoflag + 'resultCodeInfo=' + this.resultCodeInfo);
        if (getinfoflag && this.resultCodeInfo == '-') {
          console.log('get info...');
          this.resultCodeInfo = 'Поиск: ' + code;
          axios.get(`http://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=` + code)
            .then(response => {
              // JSON responses are automatically parsed.
              //console.log( response.data );
              //var re = '/<h1 class="pageTitle" style="text-align: center ">(.*)</h1>/';
              var str = response.data;
              var html_start = 'pageTitle" style="text-align: center " >';
              var html_end = '</h2>';
              var startpos = response.data.indexOf(html_start);
              if (startpos != -1) {
                console.log('startpos=' + startpos);
                var str2 = str.substring(startpos, str.length);
                //console.log('zzz='+str2);
                var endpos = str2.indexOf(html_end);
                var result_str = str2.substring(html_start.length, endpos);
                this.resultCodeInfo = result_str;
                //console.log( 'result='+result_str);
              } else this.resultCodeInfo = 'Не найден код: ' + code;
            })
            .catch(e => {
              console.log('error=' + e);
              //this.errors.push(e)
            })
        }
      },
      getfoundCodes() {
        this.foundCodes.forEach(function (value, key, map) {
          console.log("m[" + key + "] = " + value);
        })

      },

    }

  }
</script>

<style>
  /*input {*/
    /*font-size: 0; !* 为了去掉‘未选择任何文件’这几个字，也可以随便弄到哪里*!*/
  /*}*/
  /*!* 注意不是直接input > input[type=button] 哦*!*/
  /*input::-webkit-file-upload-button {*/
    /*background: #efeeee;*/
    /*color: #333;*/
    /*border: 0;*/
    /*padding: 20px 100px;*/
    /*border-radius: 5px;*/
    /*font-size: 12px;*/
    /*box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);*/
  /*}*/
  .scanner-wrapper {
    width: 600px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
  }

  .camera {
    border: 1px solid red;

    max-width: 640px;
    max-height: 480px;
    display: block;

  }
</style>
