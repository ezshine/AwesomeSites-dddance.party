class MyDetect{

    //===========================================================================
    constructor(_debug){

        this.is_mobile = false;
        this.is_android = false;
        this.is_ios = false;
        this.is_modern_ios = false;
        this.is_chrome = false;
        this.is_firefox = false;
        this.is_safari = false;
        this.is_oculus = false;

        this.detect_mobile();
        this.detect_ios();
        this.detect_android();
        this.detect_firefox();
        this.detect_chrome();
        this.detect_safari();
        this.detect_oculus();
        

        if(_debug){
            console.log("______ D E T E C T ______");
            console.log("user agent:");
            console.log(navigator.userAgent.toLowerCase());
            console.log("vendor:");
            console.log(navigator.vendor.toLowerCase());
            console.log("MOBILE ---------------- "+this.is_mobile);
            console.log("ANDROID --------------- "+this.is_android);
            console.log("IOS ------------------- "+this.is_ios);
            console.log("FIREFOX --------------- "+this.is_firefox);
            console.log("SAFARI ---------------- "+this.is_safari);
            console.log("CHROME ---------------- "+this.is_chrome);
        }


        
    }

    //===========================================================================
    detect_oculus(){
      this.is_oculus = /oculusbrowser/i.test(navigator.userAgent);
    }

    //===========================================================================
    detect_mobile(){
        this.is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    //===========================================================================
    detect_ios(){
        if(navigator.userAgent.toLowerCase().indexOf('iphone') > -1){ this.is_ios = true; }
        if(navigator.userAgent.toLowerCase().indexOf('ipad') > -1){ this.is_ios = true; }
        var ar_elem = document.createElement("a");
        this.is_modern_ios = ar_elem.relList.supports("ar"); 
        if(this.is_modern_ios){ 
            this.is_ios = true; 
            this.is_mobile = true; //modern iOS tricks into thinking is desktop 
        }
    }

    //===========================================================================
    detect_android(){
        if(navigator.userAgent.toLowerCase().indexOf('android') > -1){ this.is_android = true; }
    }

    //===========================================================================
    detect_firefox(){
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){ this.is_firefox = true; }
    }

    //===========================================================================
    detect_safari(){
        if(navigator.userAgent.toLowerCase().indexOf('safari') > -1){ this.is_safari = true; }
        if(this.is_chrome){ this.is_safari = false; }
    }

    //===========================================================================
    detect_chrome(){
        if(navigator.userAgent.toLowerCase().indexOf('chrome')>-1 && navigator.vendor.toLowerCase().indexOf('google')>-1){ this.is_chrome = true; }
        if(navigator.userAgent.toLowerCase().indexOf('crios')>-1){ this.is_chrome = true; }
    }

}
