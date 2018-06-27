class swf {
    constructor (options) {
        this.options = options;
        this.container = this.options.container;
        this.flash = "//static.m1905.com/v1/playerv2/1905HlsPlayer.swf";
        this.configUrl="http://profile.m1905.com/mvod/live.php";
    }
    embedSWF () {
        const params = {
            allowScriptAccess: "always",
            allowNetworking: "all",
            allowFullScreen: "true",
            wmode: "direct"
        };
        const flashvars = {
            configUrl:escape(this.configUrl),
            playerId:this.options.uuid,
            ref:this.options.ref,
            playAd:false,
            cid:this.options.vid
        };
        const playerid='live_play'+Math.floor(Math.random()*1000000);
        let div= document.createElement("div");
        div.id=playerid;
        this.container.appendChild(div);
        if (swfobject) {
            swfobject.embedSWF(this.flash, playerid,'100%', '100%', "10.0.0", true, flashvars, params);
        }
        else {
            console.log('Error: Can\'t find swfobject.');
        }

    }
}
export default swf;
