import vast from './vast';
import Promise from 'promise-polyfill';

class Ads {
    constructor (options) {
        this.options = options;
        this.container = this.options.container;
        //this.advideo = this.options.advideo;
        this.advideo = this.options.video;
        this.video = this.options.video;
        this.events = this.options.events;
        this.adresponse;
        this.pre;
        this.showads = false;

        this.index = 0;
        this.pre_duration = 0;
        this.countdown = 0;
        this.triggerpreend = this.triggerpreend.bind(this);
        this.triggerpretimeupdate = this.triggerpretimeupdate.bind(this);
        this.postnext = this.postnext.bind(this);
        this.posttimeupdate = this.posttimeupdate.bind(this);
        this.send();
    }
    SendXMLHttpRequest  (url, data, success, error, fail)  {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    const response = xhr.responseText;

                    //if (response.code !== 0) {
                    //    return error(xhr, response);
                    //}

                    return success(xhr, response);
                }

                fail(xhr);
            }
        };

        xhr.open(data !== null ? 'POST' : 'GET', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data !== null ? JSON.stringify(data) : null);
    }

    send () {
        let apiurl;

        let bidrequest = {
            "site": {
                "domain": "www.aliyun.com",
                "cat": ["IAB1"],
                "page": "http://www.aliyun.com/",
                "publisher": {
                    "id": 119
                }
            },
            "ext": {
                "adslot_id": 12035,
                "ssp_id": 2832689457
            },
        };
        bidrequest = escape(JSON.stringify(bidrequest));
        apiurl = `http://oa-mssp.data.aliyun.com/fetch_creative_ability?fetchtype=1&bidrequest=${bidrequest}`;

        //this.events && this.events.trigger('danmaku_load_start');
        const endpoints = ([]).slice(0);
        endpoints.push(apiurl);
        this.SendXMLHttpRequest(apiurl,null,(xhr, response) => {
            console.log('success');
            this.playads(JSON.parse(response));
        }, (xhr, response) => {
            console.log('error');
            console.log(response);
            this.failplay();
        }, (xhr) => {
            console.log('fail');
            console.log(xhr);
            this.failplay();
        });
        //this.events && this.events.trigger('danmaku_load_end');
    }
    failplay(){
        console.log('fail play');
        this.container.style.display = 'none';
        this.options.callback();
    }
    playads(response){
            this.adresponse = response;
            if(response.content && response.content.pre)
            {
                this.pre = response.content.pre;
                if(this.pre.length>0)
                {
                    this.pre_duration = this.pre[this.index].total_duration;
                    this.options.adcountdown.innerHTML = this.pre_duration;
                    this.nextads();
                    this.initads();
                }
            }
            else
            {
                this.failplay();
            }
    }
    play () {

        const playedPromise = Promise.resolve(this.advideo.play());
        playedPromise.catch(() => {
            this.pause();}
        ).then(() => {
        });
    }
    /**
     * Pause video
     */
    pause () {
        this.advideo.pause();
    }
    /**
     * attach event
     */
    on (name, callback) {
        this.events.on(name, callback);
    }
    nextads(){
        if(this.pre.length>this.index)
        {
            let user_define_content = JSON.parse(this.pre[this.index].data[0].user_define_content);
            this.advideo.src = user_define_content.creative.animationUrl;
            setTimeout(() => {
                if (this.options.autoplay || this.showads) {
                    this.play();
                }
            }, 0);
            console.log(this.index);
            console.log(this.pre[this.index].data[0].click_url);
            let click_url = this.pre[this.index].data[0].click_url;
            this.options.admore.addEventListener('click', () => {window.open(click_url);});
            this.options.adlink.addEventListener('click', () => {window.open(click_url);});
            this.pre_duration = this.options.adcountdown.innerHTML;
            this.index++;
        }
        else
        {
            console.log('pre ends end');
            this.container.style.display = 'none';
            this.advideo.removeEventListener('ended',this.triggerpreend);
            this.advideo.removeEventListener('timeupdate', this.triggerpretimeupdate);
            this.options.callback();
        }
    }
    initads (){
        this.on('adended', () => {
            console.log('ads video ended');
            this.nextads();
        });
        this.on('adtimeupdate', () => {
            console.log('ads ttimeupdate');
            let ct = this.advideo.currentTime;
            if(!this.showads)
            {
                this.showads = true;
                this.container.style.display = '';
                this.options.controller.hide();
            }
            this.countdown = this.pre_duration - Math.floor(ct);
            if(this.countdown < 0){
                this.countdown = 0;
            }
            this.options.adcountdown.innerHTML = this.countdown;
        });
        this.advideo.addEventListener('ended',this.triggerpreend);
        this.advideo.addEventListener('timeupdate', this.triggerpretimeupdate);
        //this.video.addEventListener('pause', () => {this.showpausead();});
        //this.video.addEventListener('play', () => {this.options.adapter.style.display = 'none';});
        //this.video.addEventListener('ended', () => {this.sendpostad();});
    }
    triggerpreend(){
        this.events.trigger('adended');
    }
    triggerpretimeupdate(){
        this.events.trigger('adtimeupdate');
    }
    hidepausead(){
        this.options.adapter.style.display = 'none';
    }
    showpausead(){
        this.options.adapter.style.display = '';
        let strhtml =`
  <div id="oa-2832689457-119-11189-1528273262434">
    <script type="text/javascript">
      oa_imp_w = 300;
      oa_imp_h = 0;
      oa_imp_pos = 1;
      oa_site_publisher = {"id":119};
      oa_site_domain = null;
      oa_ext_ssp_id = 2832689457;
      oa_ext_adslot_id = 11189;
      oa_ext_key_words = "";
      oa_ext_dmp_id = "";
      oa_ext_video_content_targeting = "";
      oa_timestamp = 1528273262434;
      oa_id = "oa-2832689457-119-11189-1528273262434";
      oa_serverUrl = "oa-mssp.data.aliyun.com";
      oa_fetchtype = 0;
      oa_fetchnum = 1;
    </script>
    <script type="text/javascript" src="//g.alicdn.com/openad/dsp-front-booth/3.0.0/odv.min.js?t=1528273262434"></script>
  </div>`;
        const adpausecontainer = this.options.adapter.querySelector(".adloader_pause");
        adpausecontainer.innerHTML = "";
        const fname = 'ifr_loader_'+Math.floor(Math.random()*1000000);
        let iframe= document.createElement("iframe");
        iframe.id = fname;
        iframe.height="100%";
        iframe.width="100%";
        iframe.frameBorder=0;
        iframe.scrolling="no";
        iframe.style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background: none; pointer-events: auto;"
        adpausecontainer.appendChild(iframe);
        var iframeElement = document.getElementById(fname);
        var iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
        iframeDoc.write(strhtml);
        this.options.adbtnclose.addEventListener('click', () => {this.options.adapter.style.display = 'none';});
    }
    sendpostad(){
        if(this.adresponse.content.post)
        {
            const cids = [];
            const ip = this.adresponse.content.post[0].ip;
            const cpid = this.adresponse.content.post[0].aid;
            for (let i = 0; i < this.adresponse.content.post.length; i++) {
                cids.push(this.adresponse.content.post[i].id);
            }
            let apiurl = `http://oa-mssp.data.aliyun.com/fetch_creative_stage?sid=2832689457&astid=12035&cpid=${cpid}&cids=${cids.join(',')}&ip=${ip}&fid=&mode=2`;
            console.log(apiurl);
            this.SendXMLHttpRequest(apiurl,null,(xhr, response) => {
                console.log('success');
                this.showpostad(response);
            }, (xhr, response) => {
                console.log('error');
                console.log(response);
            }, (xhr) => {
                console.log('fail');
                console.log(xhr);
            });
        }
    }
    showpostad(response){
        const json_vast = vast.readvast(response);
        if(json_vast.media_files.length>0)
        {
            this.container.style.display = '';
            this.index = 0;
            this.pre_duration =  json_vast.duration;
            this.options.adcountdown.innerHTML = json_vast.duration;
            this.pre = json_vast;
            this.postnext();
            this.advideo.addEventListener('ended',this.postnext);
            this.advideo.addEventListener('timeupdate', this.posttimeupdate);

        }
    }
    posttimeupdate(){
        console.log('post ads ttimeupdate');
        let ct = this.advideo.currentTime;
        this.countdown = this.pre_duration - Math.floor(ct);
        if(this.countdown < 0){
            this.countdown = 0;
        }
        this.options.adcountdown.innerHTML = this.countdown;
    }
    postnext(){
        console.log('ended:');
        console.log(this.index);
        if(this.pre.media_files.length>this.index) {

            this.advideo.src = this.pre.media_files[this.index].url;
            setTimeout(() => {
                    this.play();
            }, 0);
            let click_url = this.pre.media_files[this.index].clicktracking;
            this.options.admore.addEventListener('click', () => {
                window.open(click_url);
            });
            this.options.adlink.addEventListener('click', () => {
                window.open(click_url);
            });
            this.pre_duration = this.options.adcountdown.innerHTML;
            this.index++;
        }
        else
        {
            this.container.style.display = 'none';
            this.advideo.removeEventListener('ended',this.postnext);
            this.advideo.removeEventListener('timeupdate', this.posttimeupdate);
        }
    }

}
export default Ads;
