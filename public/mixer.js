(function() {
    var masterDaw;

    /* function for drawing canvas*/

    var canvas = document.getElementById("canvas");
    var canvasContext = canvas.getContext('2d');
    var listeningPointX, listeningPointY;
    var listeningPointW, listeningPointH;
    var listeningAngle = 0,listeningRotationAngle,onDownAngle,onMoveAngle;
    var listeningmiddlePointX,listeningmiddlePointY;
    var sourceX,sourceY,sourceZ,sourceW,sourceH;
    var transX,transY;
    var source01X,source01Y,source01W,source01H;
    var source02X,source02Y,source02W,source02H;
    var alpha,beta,ganma;

    var x,y,relX,relY,relAngle = 0;
    var draggingListener = false;
    var draggingSource;
    var onRight = false;
    var listenerimage = new Image();
    var image;
    var initFlag = true;
    var spFlag = false;
    
    var testmusicdata = [];
    var musicdata = [];
    var musicdoc = [];
    var songtitles = [];
    var songname = [];
    var trackgroup = [];
    var fileList = [];
    var songRef = [];
    var downloadRef = [];
    var musicList = [];
    var scheduled_time = [];
    var musictime;
    var musicURLref;
    var playersongname;
    
    
    async function PlayList(){
        document.getElementById("canvas").style.display ="none";
        var idid = await getTrackGroup("trackGroup");
        for (var i = 0; i < musicdata.length; ++i){
            songRef.push(musicdata[i].songRef);
            downloadRef.push(musicdata[i].tracks)
        }
        await testgetSongName("Songs");
        await trr("Songs");
        console.log(testmusicdata);
        console.log(songRef);
        //await testgetSongName(collection);
        //console.log(musicdata[0].tracks);
        for (var i = 0; i < songRef.length; ++i){
            await getSongName(songRef[i]);
            console.log(songname[i].songName);
        }
        //console.log(musicdata[0].songName);
        var playList = '<ul>';
        console.log(testmusicdata['l7uPbAnvCunXShciH6RT']);
        console.log(testmusicdata);
        //console.log(testmusicdata[1]);
        
        for(var i=0; i<musicdoc.length; i++){
            fileList.push({name : musicdata[i].trackGroupName, url : 'audio/'+ sources});
            playList += '<li id =' + musicdata[i].songRef + '>';
            playList += fileList[i].name + '<br>' + testmusicdata[songRef[i]] + '</li>';
        }
        playList += '</ul>';
        $('#playListArea').append(playList);
        //$('#'+musicdata[0].songName).on('click', init);
        
        for(var i=0; i<musicdoc.length; i++){
            $('#'+musicdata[i].songRef).on('click', { value: i },start_music);
        }
        
        //$('#'+musicdata[0].songName).on('click', start_music);
        //$('#'+musicdata[1].songName).on('click', start_music);
        //$('ul').on('click', init);
        //document.getElementById("playListArea").innerHTML = playList;
    //start_music();
        
        
}

function start_music(e){
    //console.log(downloadRef[e.data.value]);
    sources = downloadRef[e.data.value]
    musicURLref = e.data.value;
    playersongname = testmusicdata[songRef[e.data.value]];
    init();
}
   
    
function getDevice(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        return 'sp';
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return 'tab';
    }else{
        return 'other';
    }
}
    function testPromise(){
        foo("Songs").then(PlayList);
    }
    
function getTrackGroup(collection) {
    return new Promise(function(resolve){
        
        var db = firebase.firestore();
   
        dafa = db.collection(collection).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        musicdoc.push(doc.id);
        data = doc.data();
        musicdata.push(data);
        //songRef.push(musicdata.songRef);
        resolve();
    });
});
        //resolve();

    // 非同期処理（後述）
    // 処理終了箇所で resolve() を実行する、エラーなら reject() を実行する

  });
}

function trr(collection) {
    return new Promise(function(resolve){
        
        var db = firebase.firestore();
        let songsRef = db.collection(collection);

        // [START order_and_limit]
        var doc = songsRef.orderBy("songName").limit(3);
        console.log(doc);
        doc.get().then(function (documentSnapshots) {
            console.log(documentSnapshots.docs);
        });
        resolve();
    });
}



    function testgetSongName(collection) {
    return new Promise(function(resolve){
        
        var db = firebase.firestore();
   
        dafa = db.collection(collection).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //musicdoc.push(doc.id);
        data = doc.data();
        console.log(data);
        
        testmusicdata[doc.id] = data.songName;
        //songRef.push(musicdata.songRef);
        resolve();
    });
});
        //resolve();

    // 非同期処理（後述）
    // 処理終了箇所で resolve() を実行する、エラーなら reject() を実行する

  });
}



    function getSongName(Refname) {
    return new Promise(function(resolve){
        
        var db = firebase.firestore();
   
        var docRef = db.collection("Songs").doc(Refname);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var data = doc.data();
                songname.push(data);
                console.log(songname);
                resolve();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        })}

    function accesstoDB(collection){
        var dummy;
        var db = firebase.firestore();
   
        dafa = db.collection(collection).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        musicdoc.push(doc.id);
        musicdata = doc.data();
        console.log(musicdata);
        //musicdata.push(musicdata);
        dummy = doc.data();
    });
});
        return musicdata;
    
}
    
    async function virtualSpace() {
       
        var self = this;
        var devtype;
        // init size
        
        devtype = getDevice();
        console.log(devtype);
        if( devtype == 'sp' ){
            var b = document.body;
            var d = document.documentElement;
            canvas.width = Math.max(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
            canvas.height = Math.max(b.clientHeight , b.scrollHeight, d.scrollHeight, d.clientHeight) / 5 * 4;
            //$('#canvas').css('height', '100%');
            //canvas.width = screen.width*2;
            //canvas.height = screen.height;
            document.getElementById("container").style.display ="none";
            spFlag = true;
            //window.resizeTo(screen.width,screen.height);
            
        }else if( devtype == 'tab' ){
            var b = document.body;
            var d = document.documentElement;
            canvas.width = Math.max(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
            canvas.height = Math.max(b.clientHeight , b.scrollHeight, d.scrollHeight, d.clientHeight);
            spFlag = true;
        }else if( devtype == 'other' ){
            canvas.width = 640;
            canvas.height = 480;
        }
        listeningPointW = 80;
        listeningPointH = 80;
        
        sourceW = 80; sourceH = 80;
        //source01W = 30; source01H = 30;
        //source02W = 30; source02H = 30;
        
        // init position
        listeningPointX = canvas.width / 2 - listeningPointW / 2;
        listeningPointY = canvas.height / 2 - listeningPointH / 2;
        for (var i = 0; i < sources.length; ++i){
            if (i % 2 == 0){
                sourceX[i] = canvas.width / 2 - sourceW / 2 - sourceW;
                sourceY[i] =  canvas.height / (sources.length + 2) * 2 * (i / 2+ 1);
            }else{
                sourceX[i] = canvas.width / 2 - sourceW / 2 + sourceW;
                sourceY[i] =  canvas.height / (sources.length + 2) * 2 * (i / 2);
            }
            console.log(sourceY[i],canvas.height);
        }
        //sourceY[6] = 100;
        //sourceY[7] = 100;
        
        // first draw
        drawIn2D();
        initFlag = false;
    }

    function drawIn2D() {
        
        canvasContext.clearRect(0,0,canvas.width, canvas.height);

        if (initFlag){
            listenerimageurl ='images/' + listenerimagesource;
            listenerimage.src = listenerimageurl;
            listenerimage.onload = function(){
                canvasContext.drawImage(listenerimage,listeningPointX, listeningPointY, listeningPointW,listeningPointW);
            }
            canvasContext.font = "bold 60px 'Monotype Corsiva'";
            canvasContext.textAlign = 'left';
            canvasContext.textBaseline = 'top';
            for (var i = 0; i < sources.length; ++i){
                canvasContext.fillText(i+1, sourceX[i], sourceY[i]);
                //canvasContext.fillRect(sourceX[i], sourceY[i], sourceW, sourceH)
            }
        //var url = "images/guitar.png" ;
        /*
        for (var i = 0; i < sources.length; ++i){
            imageurl[i] = 'images/' + imagesources[i];
            image[i].src = imageurl[i];
        }
        var imagesloadedCount = 1;
        for (var i in image) {
        image[i].addEventListener('load', function() {
            if (imagesloadedCount == image.length) {
                for (var j in image) {
                    console.log("draw");
                    canvasContext.drawImage(image[j], sourceX[j], sourceY[j], sourceW, sourceH );
                }
            }
            imagesloadedCount++;
        }, false);
    }*/

            
        }else{
            canvasContext.save();
 
            canvasContext.setTransform(1,0,0,1,0,0);
            canvasContext.translate(listeningPointX+0.5*listeningPointW,listeningPointY+0.5*listeningPointH);
            canvasContext.rotate(listeningAngle);
            canvasContext.drawImage(listenerimage,-0.5*listeningPointW,-0.5*listeningPointH,listeningPointW,listeningPointH);
 
        canvasContext.restore();
            for (var i = 0; i < sources.length; ++i){
                canvasContext.fillText(i+1, sourceX[i], sourceY[i]);
                //canvasContext.fillRect(sourceX[i], sourceY[i], sourceW, sourceH);
            }
        /*
            for (var i = 0; i < sources.length; ++i){
                canvasContext.drawImage(image[i], sourceX[i], sourceY[i], sourceW, sourceH );
            }*/
        }
        
        //canvasContext.fillRect(source01X, source01Y, source01W, source01H);
        //canvasContext.fillRect(source02X, source02Y, source02W, source02H);
    }
    
    function onDown(e) {
        e.preventDefault();
        var offsetX = canvas.getBoundingClientRect().left;
        var offsetY = canvas.getBoundingClientRect().top;
        var touchx = [],touchy = [];
        //console.log(e.touches.length);
        if (spFlag){
            for (var i = 0; i < e.touches.length; ++i){
                touchx[i] = e.touches[i].pageX;
                touchy[i] = e.touches[i].pageY;
            }
            x = touchx[0];
            y = touchy[0];
        }else{
            x = e.clientX - offsetX;
            y = e.clientY - offsetY;
        }
        
        console.log(x,y);
        //x = e.changedTouches[0].pageX;
        if (listeningPointX < x && listeningPointX+listeningPointW > x && listeningPointY < y && listeningPointY + listeningPointH > y) {
            draggingListener = true;
            relX = listeningPointX - x;
            relY = listeningPointY - y;
        }
        for (var i = 0; i < sources.length; ++i){
            if (sourceX[i] < x && sourceX[i]+sourceW > x && sourceY[i] < y && sourceY[i] + sourceH > y) {
                console.log("In");
                draggingSource[i] = true;
                relX = sourceX[i] - x;
                relY = sourceY[i] - y;
                break;
            }
        }
    }
        
    function onRightDown(e){
        e.preventDefault();
        var offsetX = canvas.getBoundingClientRect().left;
        var offsetY = canvas.getBoundingClientRect().top;
        listeningmiddlePointX = listeningPointX + listeningPointW / 2;
        listeningmiddlePointY = listeningPointY + listeningPointH / 2;

        if (spFlag){
            //document.write('OK');
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        }else{
            //document.write('OK');
            x = e.clientX - offsetX;
            y = e.clientY - offsetY;
        }

        if (listeningPointX < x && listeningPointX+listeningPointW > x && listeningPointY < y && listeningPointY + listeningPointH > y) {
            onRight = true;
            onDownAngle = Math.atan2(listeningmiddlePointY-y,x-listeningmiddlePointX)
            if (onDownAngle > 0 && Math.PI > onDownAngle){
                onDownAngle = 2 * Math.PI -onDownAngle;
            }else{
                onDownAngle = -onDownAngle;
            } 
            
            //onMoveAngle = Math.atan2(3,-3) / (Math.PI / 180)
            relX = listeningPointX - x;
            relY = listeningPointY - y;
        }
        e.preventDefault();
        return false;
        //e.preventDefault(); 
    }   

    function onmove(e) {
        e.preventDefault();
        var offsetX = canvas.getBoundingClientRect().left;
        var offsetY = canvas.getBoundingClientRect().top;

        var panTemp=15;
        
        console.log(masterDaw.mixer.surroundflag);
        if (!masterDaw.mixer.surroundflag){
            document.getElementById('surroundbutton').src = "images/surround.png";
            masterDaw.mixer.surroundflag = true;
        }

        if (spFlag){
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        }else{
            x = e.clientX - offsetX;
            y = e.clientY - offsetY;
        }
        
        if (onRight){
            onMoveAngle = Math.atan2(listeningmiddlePointY-y,x-listeningmiddlePointX);
            if (onMoveAngle > 0 && Math.PI > onMoveAngle){
                onMoveAngle = 2 * Math.PI - onMoveAngle;
            }else{
                onMoveAngle = -onMoveAngle;
            }
        
            listeningRotationAngle = onMoveAngle - onDownAngle;
            
            if (listeningRotationAngle < 0){
                listeningRotationAngle = 2 * Math.PI + listeningRotationAngle;
            }
            listeningAngle = listeningRotationAngle + relAngle;
            if (listeningAngle > 2 * Math.PI){
                listeningAngle = listeningAngle - 2 * Math.PI;
            }else if (listeningAngle < 0){
                listeningAngle = listeningAngle + 2* Math.PI;
            }
        for (var i = 0; i < sources.length; ++i){
            //masterDaw.mixer.channels[i].panner.setPosition((sourceX[i]-listeningPointX),0,(sourceY[i]-listeningPointY))
            transX = (sourceX[i]-listeningPointX) * Math.cos(listeningAngle) - (sourceY[i]-listeningPointY) * Math.sin(listeningAngle);
            transY = (sourceX[i]-listeningPointX) * Math.sin(listeningAngle) + (sourceY[i]-listeningPointY) * Math.cos(listeningAngle);
            masterDaw.mixer.channels[i].panner.setPosition(transX,0,transY)
            }

        draggingListener = false;
        //relAngle = listeningRotatonAngle;
        console.log(listeningAngle);
        drawIn2D();
        //console.log(listeningAngle/ (Math.PI / 180));
    }

        if (draggingListener) {
            listeningPointX = x + relX;
            listeningPointY = y + relY;
            drawIn2D();
            for (var i = 0; i < sources.length; ++i){
            //masterDaw.mixer.channels[i].panner.setPosition((sourceX[i]-listeningPointX),0,(sourceY[i]-listeningPointY))
                transX = (sourceX[i]-listeningPointX) * Math.cos(listeningAngle) - (sourceY[i]-listeningPointY) * Math.sin(listeningAngle);
                transY = (sourceX[i]-listeningPointX) * Math.sin(listeningAngle) + (sourceY[i]-listeningPointY) * Math.cos(listeningAngle);
                masterDaw.mixer.channels[i].panner.setPosition(transX,0,transY)
            }
        }
        
        for (var i = 0; i < sources.length; ++i){
            if (draggingSource[i]) {
                sourceX[i] = x + relX;
                sourceY[i] = y + relY;
                sourceZ[i] = 0
                drawIn2D();
                //masterDaw.mixer.channels[i].panner.setPosition((sourceX[i]-listeningPointX),0,(sourceY[i]-listeningPointY))
                transX = (sourceX[i]-listeningPointX) * Math.cos(listeningAngle) - (sourceY[i]-listeningPointY) * Math.sin(listeningAngle);
                transY = (sourceX[i]-listeningPointX) * Math.sin(listeningAngle) + (sourceY[i]-listeningPointY) * Math.cos(listeningAngle);
                masterDaw.mixer.channels[i].panner.setPosition(transX,0,transY)
                break;
            }
        }

    }
    
    //function (channelnum)

    function onUp(e) {
        e.preventDefault();
        relAngle = listeningAngle;
        draggingListener = false;
        onRight = false;
        for (var i = 0; i < sources.length; ++i) {
        draggingSource[i] = false;
        }
    }


    /**
     * below by web audio mixer
    */
    /*
    function loadBuffer(source, context, fn) {
        var request = new XMLHttpRequest();
        request.open('GET', 'audio/'+source, true);
        //xhr2 - http://www.html5rocks.com/en/tutorials/file/xhr2/
        request.responseType = 'arraybuffer';
        request.onload = function() {
            console.log(request.response);
            // Asynchronously decode the audio file data in request.response
            context.decodeAudioData(request.response, function(buff) {
                buffer = buff;
                fn(buffer);
            }, function(error) {
                console.log(error);
            });
        };
        request.send();
    };
    */
var streamcount=0;

    function audioCtx() {
        var audioCtx = (window.AudioContext || window.webkitAudioContext ||
            window.mozAudioContext || window.oAudioContext ||
            window.msAudioContext);
        if (audioCtx) {
            return new audioCtx();
        } else {
            alert(
                'Web Audio not supported in this browser. Please use a modern browser such as Chrome or Firefox'
            );
            return;
        }
    };

    function filterFactory(ctx, type, frequency, gain, q) {
        var filter = ctx.createBiquadFilter();
        filter.type = type;
        filter.frequency.value = frequency;
        if (gain) {
            filter.gain.value = gain;
        }
        if (q) {
            filter.Q.value = q;
        }
        return filter;
    };

    function Button(channel, className, text, label) {
        if (!label) label = '';
        if (!text) text = '';
        var button = $('<div class="button-container ' + className +
            '">' + label + '<div class="button-control">' + text +
            '</div></div>');
        channel.append(button);
        button.on('click', function() {
            var channelNo = $(this).parents('.channel').index();
            $(this).trigger('focused', channelNo);
        });
        return button;
    };

    function Fader(channel, count, className) {
        var fader = $('<div class="fader-container ' + className +
            '"><div class="channel-notches"><div class="channel-notch"></div><div class="channel-notch"></div><div class="channel-notch zeroed">0</div><div class="channel-notch"></div><div class="channel-notch"></div><div class="channel-notch"></div><div class="channel-notch"></div><div class="channel-notch"></div><div class="channel-notch"></div><div class="channel-notch"></div></div><div class="fader-no">' +
            count +
            '</div><div class="fader-track"><div class="fader"><div></div></div></div></div>'
        );
        channel.append(fader);
        $(fader).find('.fader').on('mousedown', function(e) {
            var el = $(this),
                pos = e.pageY,
                offset = el.position().top;
            $(document).mousemove(function(evt) {
                var move = (evt.pageY - pos);
                var top = (move + offset);
                if ((top >= -35) && (top <= 260)) {
                    el.css('top', (move + offset) +
                        'px');
                    //plus 35 so we have a positive range to deal with - by default the range is -35 to 250
                    el.trigger('fader', (move + offset +
                        35));
                }
            });
            $(document).on('mouseup', function() {
                $(document).off('mousemove');
            });
        });
        $(fader).find('.fader').on('dblclick', function() {
            $(this).css({
                "top": '30px'
            });
            $(this).trigger('fader', (0 + 35 + $(this).position()
                .top));
        });
        return fader;
    };

    /* I need better trigonometry */
    function RotaryKnob(channel, label, className) {
        var knobTemplate = $(rotaryKnobTemplate);
        if (className) {
            knobTemplate.find('.dial').addClass(className);
        }
        channel.append(knobTemplate);
        var notches = $(knobTemplate).find('.notches');
        $(knobTemplate).prepend('<p>' + label + '</p>');
        var degree = 0;
        for (var i = 0; i < 15; ++i) {
            if (i > 9 || i < 6) {
                if (i == 0) {
                    var minute = $('<div class="minutes zero"></div>');
                } else {
                    var minute = $('<div class="minutes"></div>');
                }
                minute.css('-webkit-transform', 'rotate(' + degree +
                    'deg)');
                notches.append(minute);
            }
            degree = degree + 24;
        }
        $(knobTemplate).find('.dial').on('mousedown', function(e) {
            var el = $(this),
                offset = el.offset(),
                center_x,
                center_y,
                mouse_x,
                radians,
                degree,
                degreeRatio;
            $(document).mousemove(function(evt) {
                center_x = (offset.left) + (el.width() /
                    2);
                center_y = (offset.top) + (el.height() /
                    2);
                mouse_x = evt.pageX;
                var mouse_y = evt.pageY;
                radians = Math.atan2(mouse_x - center_x,
                    mouse_y - center_y);
                degree = (radians * (180 / Math.PI) * -
                    1);
                if (degree < 0) {
                    degree = degree + 360;
                }
                if (degree >= 50 && degree <= 310) {
                    el.css('-moz-transform', 'rotate(' +
                        degree + 'deg)');
                    el.css('-webkit-transform',
                        'rotate(' + degree + 'deg)'
                    );
                    degreeRatio = ((degree - 180) / 4);
                    el.trigger('change', degreeRatio);
                }
            });
            $(document).on('mouseup', function() {
                $(document).off('mousemove');
            });
        });
        $(knobTemplate).find('.dial').on('dblclick', function() {
            $(this).css({
                "-webkit-transform": 'rotate(180deg)'
            });
            $(this).trigger('change', 0)
        });
        return knobTemplate;
    };

    function Timer() {
        this.offset;
        this.clock = 0;
        this.interval = 0;
    };

    Timer.prototype.start = function() {
        if (!this.interval) {
            this.offset = Date.now();
            this.interval = setInterval(this.update.bind(this), 1);
        }
    };

    Timer.prototype.stop = function() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    Timer.prototype.reset = function() {
        this.clock = 0;
        this.render(0);
    };

    Timer.prototype.update = function() {
        this.clock += this.delta();
        this.render();
    };

    Timer.prototype.render = function() {
        var curr = new Date(this.clock);
        var secs = this.pad(curr.getSeconds());
        var millis = this.pad(((curr.getMilliseconds() / 10) % 100).toFixed());
        var mins = this.pad(curr.getMinutes());
        $('#time-milli').text(millis);
        $('#time-min').text(mins);
        $('#time-secs').text(secs);
    };

    Timer.prototype.pad = function(num) {
        if (num < 10) {
            return '0' + num.toString();
        }
        return num;
    };

    Timer.prototype.delta = function() {
        var now = Date.now(),
            d = now - this.offset;
        this.offset = now;
        return d;
    };

    /* function for drawing Daw*/

    function Daw() {
        var self = this;
        this.ctx = audioCtx();
        this.tracks = [];
        this.buffered = 0;
        this.bufferTracks(function() {
            self.mixer = new Mixer(self.ctx, self.tracks, self.tracknum);
            self.tracks = [];
            self.tracknum;
            self.hideLoader();
            self.showMixer();
            $('#play').click();
            self.initHints();
        });
    };

    Daw.prototype.showMixer = function() {
        $('#mixer').show();
    };

    Daw.prototype.hideLoader = function() {
        $('#loader').hide();
    };
    /*
    Daw.prototype.bufferTracks = function(cb) {
        var self = this;
        if (cb) this.cb = cb;
        this.populateLoader();
        loadBuffer(sources[this.buffered], this.ctx, function(buffer) {
            self.updateLoader(self.buffered);
            self.tracks.push({
                'buffer': buffer,
                'name': sources[self.buffered]
            });
            self.buffered++;
            if (self.tracks.length === sources.length) {
                self.cb();
            } else {
                self.bufferTracks();
            }
        });
    };*/
    
    Daw.prototype.bufferTracks = function(cb) {
        var self = this;
        if (cb) this.cb = cb;
        this.populateLoader();
        self.cb();
    };
    


    Daw.prototype.populateLoader = function(current) {
        $('#loader span.total').text(sources.length);
        $('#loader').show();
    };

    Daw.prototype.updateLoader = function(current) {
        $('#loader span.current').text(current + 1);
    };

    Daw.prototype.initHints = function() {
        var hintsClone = $('#hints').clone();
        $('#mixer').prepend(hintsClone).show();
        hintsClone.show();
        hintsClone.find('li').hover(function() {
            $(this).find('div').show();
        }, function() {
            $(this).find('div').hide();
        });
    };

    var firstplay = false;
    /* Mixer based on Yamaha's N12 */
    function Mixer(ctx, tracks,tracknum) {
        var track,
            trackName,
            trackBuffer,
            count = 0,
            rawBuffer;
        //this.audio = new Audio('audio/'+sources[0]);
        this.audio = [];
        //var audiodom = '<audio src= audio/' + sources[0] + ' mediagroup="sample" controls></audio><audio src= audio/' + sources[1] + ' mediagroup="sample"></audio><audio src= audio/' + sources[2] + ' mediagroup="sample"></audio><audio src= audio/' + sources[3] + ' mediagroup="sample"></audio>';
        //var audiodom = '<audio mediagroup="group" controls><source src=audio/' + sources[2] + '></audio><audio mediagroup="group" ><source src=audio/' + sources[0] + '></audio>';
        //console.log(audiodom);
        //$('#audiogroup').append(audiodom);
        //audioNode = document.querySelector("audio");
        //console.log(audioNode.mediaGroup);
        //console.log(audioNode);
        
        this.surroundflag = true;
        this.soloed = 0;
        this.musicduration = 0;
        this.channels = [];
        this.el = $('#mixer');
        this.ctx = ctx;
        //hardcode duration for time being as the tracks are longer than the song is audible
        //Can't be bothered to open pro tools and trim the mp3s
        this.duration = 200;
        //this.tracks = tracks;
        self.playingBack = false;
        this.createMasterChannel();
        this.audio_duration = [];
        this.count = 0;
        this.playflag = false;
        this.createAudio();
        //var mes = this.ctx.createMediaElementSource(audio);
        //audio.play();
        this.createChannel();
        console.log(tracks.length);
        this.createTransport();
        //document.getElementById('duration').innerHTML = Math.round(this.audio[0].duration);
        
        
    };
    
    Mixer.prototype.createChannel = function(){
        for (var i = 0; i < sources.length; ++i) {
            //var buffSource;
            //track = tracks[i];
            //rawBuffer = track.buffer;
            trackName = sources[i];
            buffSource = this.createBufferSource(this.audio[i]);
            //this.updateDuration(buffSource.buffer.duration * 1000,trackName);
            this.channels.push(new Channel(buffSource, trackName, this, this.ctx, i));
            //this.audio_duration.push(buffSource.buffer.duration);
            //console.log(buffSource.buffer);
            //console.log(buffSource.buffer.duration);
            //console.log(this.audio_duration);
        }
    }
    
    Mixer.prototype.createAudio = function(){
        var loadcount = 0;
        var musicduration = 0;
         for (var i = 0 ; i < sources.length; ++i){
            this.audio.push(new Audio());
            this.audio[i].crossOrigin = "anonymous"
            this.audio[i].src = sources[i];
            //this.audio
            this.audio[i].addEventListener("loadeddata", function(){
		        loadcount++;
		        if (this.duration > musicduration){
		            musicduration = this.duration;
		           }
		        self.playflag = false;
		        if (loadcount == sources.length){
		            firstplay = true;
		            console.log(loadcount);
		            masterDaw.mixer.musicduration = musicduration;
		            var currentTime = masterDaw.mixer.audio[0].currentTime;
		            for (var i = 0; i < sources.length; ++i){
		                masterDaw.mixer.audio[i].currentTime = currentTime;
		                masterDaw.mixer.audio[i].play();
		            }
		            console.log(musicduration);
		            //document.getElementById('current').innerHTML = playTime(current)
                    document.getElementById('duration').innerHTML = masterDaw.mixer.playTime(musicduration);
		            document.getElementById("Pause").innerText = "||";
		            console.log("Play");
		            masterDaw.mixer.audio[0].addEventListener("timeupdate", function(){
		                document.getElementById('current').innerHTML = masterDaw.mixer.playTime(Math.floor(this.currentTime));
		                document.getElementById('duration').innerHTML = masterDaw.mixer.playTime(Math.round(musicduration- Math.floor(this.currentTime)));
		                const percent = Math.round((this.currentTime / musicduration) * 1000) / 10;
                        document.getElementById('seekbar').style.backgroundSize = percent + '%';
		               }, false);
		               
		               
		               
		            }
	        }, false);
        }
    }
    
    Mixer.prototype.playTime = function(t){
        let hms = ''
        const h = t / 3600 | 0
        const m = t % 3600 / 60 | 0
        const s = t % 60
        const z2 = (v) => {
            const s = '00' + v
            return s.substr(s.length - 2, 2)
        }
        if(h != 0){
            hms = h + ':' + z2(m) + ':' + z2(s)
        }else if(m != 0){
            hms = z2(m) + ':' + z2(s)
        }else{
            hms = '00:' + z2(s)
        }
        return hms
        }
    
    Mixer.prototype.createBufferSource = function(audio) {
        //var buff = this.ctx.createBufferSource();
        var buff = this.ctx.createMediaElementSource(audio);
        //buff.buffer = buffer;
        return buff;
    };

    Mixer.prototype.createBuffers = function(p) {
        for (var i = 0; i < this.channels.length; ++i) {
            //this.channels[i].track = this.createBufferSource(this.channels[i].rawBuffer);
            this.channels[i].track = this.ctx.createMediaElementSource(this.audio[i]);
        }
    };

    Mixer.prototype.clearBuffers = function(playing) {
        for (var i = 0; i < this.channels.length; ++i) {
            if (playing && this.channels[i].track) {
                this.audio[i].pause();
            }
            //this.channels[i].track = null;
        }
    };
    

    Mixer.prototype.createTransport = function() {
        var self = this;
        this.elapsed = 0;
        this.offset = 0;
        this.start = 0;
        this.timer = new Timer();
        $('#mixer').append(
            '<div id="transport"><h1><span>&#9835; Web Audio</span> mixer</h1><div id="display"><div id="time-min">00</div><span>:</span><div id="time-secs">00</div><span>:</span><div id="time-milli">00</div><div class="clear"></div></div><div class="controls"><button id="play">&#9658;</button><button id="pause">||</button></div></div>'
        );
        //console.log(this.audio_duration);
        function onPlay(){
            var el = $(this);
            $('#transport .controls button').removeClass('on');
            el.addClass('on');
            if (self.elapsed >= self.duration) {
                self.offset = self.start = self.elapsed = 0;
                el.removeClass('on');
            }
            if (!self.playingBack) {
                if (self.count == 0){
                //self.createBuffers();
                self.count++;
                }
                self.playingBack = true;
                self.playing = setInterval(function() {
                    self.elapsed += 100;
                    if (self.elapsed >= self.duration) {
                        el.removeClass('on');
                        self.playingBack = false;
                        //self.clearBuffers(true);
                        clearInterval(self.playing);
                        self.offset = self.start = self
                            .elapsed = 0;
                    }
                }, 100);
                self.start = self.ctx.currentTime;
                self.timer.start();
                var current_time = self.ctx.currentTime;
                /*
                if (current_time < scheduled_time) {
                    for (var i = 0; i < self.channels.length; ++i) {
                        console.log(1);
                        self.channels[i].connect();
                        self.channels[i].track.start(scheduled_time[i], self.offset);
                        scheduled_time[i] += self.audio_duration[i];
                    }
                } else {
                    console.log(2);
                    for (var i = 0; i < self.channels.length; ++i) {
                        self.channels[i].connect();
                        self.channels[i].track.start(0, self.offset);
                        scheduled_time[i] = current_time + self.audio_duration[i]; //+ initial_delay_sec;
                    }
                    }
                    console.log(scheduled_time[0]);*/
                    //var date = Date.now();
                for (var i = 0; i < self.channels.length; ++i) {
                    //console.log(i);
                    self.channels[i].connect();
                    //self.channels[i].track.start(0, self.offset);
                    //console.log(self.audio);
                    //console.log(self.audio[i].currentTime);
                    //self.audio[i].play();
                }var date = Date.now();
               
                    //console.log(self.loadcount);
                
                if (firstplay){
                for (var i = 0; i < self.channels.length; ++i){
                    self.audio[i].play();
                }
                console.log(Date.now(),date,(Date.now() - date) / 1000,self.channels.length);
                document.getElementById("Pause").innerText = "||";
                self.playflag = false;
                }
                
            }
        }
        
        function onPause() {
            self.timer.stop();
            $('#transport .controls button').removeClass('on');
            $(this).addClass('on');
            self.playingBack = false;
            //self.clearBuffers(true);
            console.log("pause");
            for (var i = 0; i < self.channels.length; ++i){
                    self.audio[i].pause();
                }
            var audiocurrentTime = self.audio[0].currentTime;
            for (var i = 0; i < self.channels.length; ++i){
                    self.audio[i].currentTime = audiocurrentTime;
                }
            //document.getElementById("Pause").style.display ="none";
            //document.getElementById("Play").style.display ="block";
            document.getElementById("Pause").innerText = "▶︎";
            self.playflag = true;
            clearInterval(self.playing);
            self.offset += self.ctx.currentTime - self.start;
        }
        
        function PlayorPause(){
            if (self.playflag){
                onPlay();
            }else{
                onPause();
            }
        }
        
        function onRewind(){
            initFlag = true;
            onPause();
            musicURLref--;
            if (musicURLref < 0){
                musicURLref = musicdata.length -1;
            }
            sources = downloadRef[musicURLref];
            playersongname = testmusicdata[songRef[musicURLref]];
            init();
        }
        
        function onFF(){
            initFlag = true;
            onPause();
            musicURLref++;
            if (musicURLref > musicdata.length -1){
                musicURLref = 0;
            }
            sources = downloadRef[musicURLref];
            playersongname = testmusicdata[songRef[musicURLref]];
            init();
        }
        
        function onPlayList(){
            initFlag = true;
            document.getElementById("canvas").style.display ="none";
            document.getElementById("playListArea").style.display ="block";
        }
        
        function onSurround(){
            console.log(self.surroundflag);
            if (self.surroundflag){
                document.getElementById('surroundbutton').src = "images/notsurround.png";
                for (var i = 0; i < sources.length; ++i){
                    self.channels[i].panner.setPosition(0,0,0)
                }
                self.surroundflag = false;
            }else{
                document.getElementById('surroundbutton').src = "images/surround.png";
                //document.getElementById('surroundbutton').width = 80;
                //document.getElementById('surroundbutton').height = 80;
                for (var i = 0; i < sources.length; ++i){
                     transX = (sourceX[i]-listeningPointX) * Math.cos(listeningAngle) - (sourceY[i]-listeningPointY) * Math.sin(listeningAngle);
                    transY = (sourceX[i]-listeningPointX) * Math.sin(listeningAngle) + (sourceY[i]-listeningPointY) * Math.cos(listeningAngle);
                    self.channels[i].panner.setPosition(transX,0,transY);
                }
                self.surroundflag = true;
            }
        }
        
        //document.getElementById("spPlay").onclick = onPlay();
        $('.spPlay').on('click', onPlay);
        $('.spPause').on('click', PlayorPause);
        $('.spRewind').on('click', onRewind);
        $('.spFF').on('click', onFF);
        $('.playlistButton').on('click', onPlayList);
        $('.surroundButton').on('click', onSurround);
        //$('#play').on('click', onPlay);
        //$('#pause').on('click', PlayorPause);
    };

    Mixer.prototype.updateDuration = function(duration, t) {
        if (duration > this.duration) this.duration = duration;
    };

    Mixer.prototype.createMasterChannel = function() {
        var masterChannel = $(channelTemplate),
            masterFader = new Fader(masterChannel, '&nbsp;', 'master'),
            oldMin = 285,
            oldMax = 0,
            newMin = 0,
            newMax = 1.3,
            newVol,
            self = this;
        masterChannel.addClass('master-channel');
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 1;
        this.el.append(masterChannel);
        masterFader.on('fader', function(e, val) {
            newVol = ((val - oldMin) / (newMin - oldMin)) * (
                newMax - newMin) + newMin;
            self.masterGain.gain.value = newVol;
        });
    };

    function Channel(audio, trackName, mixer, ctx, count) {
        this.count = count;
        this.mixer = mixer;
        this.currGain = 1;
        this.el = $(channelTemplate);
        //this.track = track;
        //this.rawBuffer = rawBuffer;
        this.ctx = ctx;
        this.audio = audio
        this.on = true;
        this.soloed = false;
        this.trackName = trackName;
        this.createChannelFilters(this.el, ctx);
        this.createChannelPanner(this.el, ctx);
        this.createChannelFader(this.el, ctx);
        this.connect();
        this.createChannelControls();
        this.createChannelLabel();
        this.el.insertBefore(this.mixer.el.find('.master-channel'));
    };

    Channel.prototype.createChannelLabel = function() {
        var trackName = this.trackName.replace('.mp3', '').replace(/_/g,
            ' ');
        this.el.find('.fader-container').prepend('<p class="label">' +
            trackName + '</p>');
    };  

    Channel.prototype.enableDisableChannels = function() {
        var i;
        for (i = 0; i < this.mixer.channels.length; ++i) {
            if (!this.mixer.channels[i].on) {
                this.mixer.channels[i].gain.gain.value = 0;
            } else if (this.mixer.channels[i].on) {
                if (this.mixer.soloed === 0) {
                    this.mixer.channels[i].gain.gain.value = this.mixer
                        .channels[i].currGain;
                } else if (this.mixer.soloed > 0 && this.mixer.channels[
                    i].soloed) {
                    this.mixer.channels[i].gain.gain.value = this.mixer
                        .channels[i].currGain;
                } else {
                    this.mixer.channels[i].gain.gain.value = 0;
                }
            }
        }
    };

    //break event listeners out in to seperate method
    Channel.prototype.createChannelControls = function() {
        var self = this;
        this.highShelfControl = new RotaryKnob(this.el, 'HIGH');
        this.highShelfControl.on('change', function(e, val) {
            self.highShelfFilter.gain.value = val;
        });
        this.midControl = new RotaryKnob(this.el, 'MID', 'mid');
        this.midControl.on('change', function(e, val) {
            self.midFilter.gain.value = val;
        });
        this.midFrequencyControl = new RotaryKnob(this.el, 'MID', 'mid');
        this.midFrequencyControl.on('change', function(e, val) {
            //a little hack to get rotary to output frequency between 100hz-10khz
            var pos = val + 32;
            var value = pos < 30 ? pos * 100 : pos * 160;
            if (value < 100) value = 100;
            self.midFilter.frequency.value = value;
        });
        this.lowShelfControl = new RotaryKnob(this.el, 'LOW');
        this.lowShelfControl.on('change', function(e, val) {
            self.lowShelfFilter.gain.value = val;
        });
        this.pannerControl = new RotaryKnob(this.el, 'PAN', 'panner');
        this.pannerControl.on('change', function(e, val) {
            self.panner.pan.value = val / 31;
        });
        this.soloControl = new Button(this.el, 'solo', undefined,
            'SOLO');
        this.soloControl.on('focused', function(e, val) {
            if ($(this).hasClass('on')) {
                self.mixer.soloed--;
                $(this).removeClass('on');
                self.soloed = false;
            } else {
                self.soloed = true;
                $(this).addClass('on');
                self.mixer.soloed++;
            }
            self.enableDisableChannels();
        });
        this.muteControl = new Button(this.el, 'mute', 'ON');
        this.muteControl.on('focused', function(e, val) {
            if ($(this).hasClass('off')) {
                $(this).removeClass('off');
                self.on = true;
            } else {
                $(this).addClass('off');
                self.on = false;
            }
            self.enableDisableChannels();
        });
        this.faderControl = new Fader(this.el, this.count);
        this.faderControl.on('fader', function(e, val) {
            var oldMin = 295,
                oldMax = 0,
                newMin = 0,
                newMax = 1.3;
            var newVol = ((val - oldMin) / (newMin - oldMin)) *
                (newMax - newMin) + newMin;
            self.currGain = newVol;
            self.enableDisableChannels();
        });
    };

    Channel.prototype.connect = function() {
        this.audio.connect(this.highPassFilter);
        this.highPassFilter.connect(this.lowShelfFilter)
        this.lowShelfFilter.connect(this.highShelfFilter)
        this.highShelfFilter.connect(this.midFilter);
        this.midFilter.connect(this.panner)
        this.panner.connect(this.gain)
        this.gain.connect(this.mixer.masterGain)
        this.mixer.masterGain.connect(this.ctx.destination)
    };
    Channel.prototype.disconnect = function(){
        this.audio.disconnect(this.highPassFilter);
        this.highPassFilter.disconnect(this.lowShelfFilter)
        this.lowShelfFilter.disconnect(this.highShelfFilter)
        this.highShelfFilter.disconnect(this.midFilter);
        this.midFilter.disconnect(this.panner)
        this.panner.disconnect(this.gain)
        this.gain.disconnect(this.mixer.masterGain)
        this.ctx.close();
        //this.mixer.masterGain.disconnect(this.ctx.destination)
    }

    Channel.prototype.createChannelPanner = function(channel, track, ctx) {
        this.panner = this.ctx.createPanner();
        this.panner.panningModel = 'HRTF';
        this.panner.distanceModel = 'inverse';
        this.panner.refDistance = 100;
        this.panner.maxDistance = 10000;
        this.panner.rolloffFactor = 1;
        this.panner.coneInnerAngle = 360;
        this.panner.coneOuterAngle = 360;
        this.panner.coneOuterGain = 0;
        transX = (sourceX[this.count]-listeningPointX) * Math.cos(listeningAngle) - (sourceY[this.count]-listeningPointY) * Math.sin(listeningAngle);
        transY = (sourceX[this.count]-listeningPointX) * Math.sin(listeningAngle) + (sourceY[this.count]-listeningPointY) * Math.cos(listeningAngle);
        this.panner.setPosition(transX,0,transY);
        //this.panner.setPosition(0,0,0)
    };

    Channel.prototype.createChannelFader = function(channel, track, ctx) {
        this.gain = this.ctx.createGain();
        this.gain.gain.value = 1.0;
    };

    Channel.prototype.createChannelFilters = function(channel, track, ctx) {
        this.highPassFilter = filterFactory(this.ctx, 'highpass', 80, 0);
        this.lowShelfFilter = filterFactory(this.ctx, 'lowshelf', 90, 0);
        this.highShelfFilter = filterFactory(this.ctx, 'highshelf',
            10000, 0);
        this.midFilter = filterFactory(this.ctx, 'peaking', 10000, 0);
    };

    function init() {
        /* draw canvas*/
        document.getElementById("canvas").style.display ="block";
        document.getElementById("playListArea").style.display ="none";
        sourceX = new Array(sources.length),sourceY= new Array(sources.length),sourceZ = new Array(sources.length),sourceW= new Array(sources.length),sourceH = new Array(sources.length);
        draggingSource = new Array(sources.length);
        for (var i = 0; i < sources.length; ++i) {
            draggingSource[i] = false;
        }
        image = new Array(sources.length);
        for (var i = 0; i < sources.length; ++i) {
            image[i] = new Image();
        }
        virtualSpace();
        //$('#sp-container').append(spplayerTemplate);
        //document.getElementById("Play").style.display ="none";
        /* draw for mixer */
        if (masterDaw){
            //masterDaw.mixer.audio
            //masterDaw = new Daw();
            masterDaw.mixer.audio = [];
            masterDaw.mixer.channels = []
            masterDaw.mixer.createAudio();
            masterDaw.mixer.createChannel();
            document.getElementById('name').innerHTML = playersongname;
            console.log(masterDaw);
            console.log(sourceX);
            console.log(masterDaw.mixer);
        }else{
            $('#sp-container').append(seekbar);
            document.getElementById('seekbar').addEventListener("touchstart",function(e){
                console.log("seek");
        if(!isNaN(masterDaw.mixer.musicduration)){
            if (spFlag){
                console.log(6);
                var mouse = e.touches[0].pageX;
            }else{
                console.log(5);
                var mouse = e.clientX 
            }
            const element = document.getElementById('seekbar');
            const rect = element.getBoundingClientRect();
            const position = rect.left + window.pageXOffset;
            const seekoffset = mouse - position;
            const width = rect.right - rect.left;
            var currentplaytime = Math.round(Math.round(masterDaw.mixer.musicduration) * (seekoffset / width));
            console.log(masterDaw.mixer.musicduration,seekoffset);
            console.log(currentplaytime);
            for (var i = 0; i < sources.length; ++i){
                masterDaw.mixer.audio[i].currentTime = currentplaytime;
                }
        }
    }, false);
    
    document.getElementById('seekbar').addEventListener("touchmove",function(e){
        console.log("seek2");
        if(!isNaN(masterDaw.mixer.musicduration)){
            if (spFlag){
                var mouse = e.touches[0].pageX;
            }else{
                var mouse = e.clientX 
            }
            const element = document.getElementById('seekbar');
            const rect = element.getBoundingClientRect();
            const position = rect.left + window.pageXOffset;
            const seekoffset = mouse - position;
            const width = rect.right - rect.left;
            var currentplaytime = Math.round(Math.round(masterDaw.mixer.musicduration) * (seekoffset / width));
            
            for (var i = 0; i < sources.length; ++i){
                masterDaw.mixer.audio[i].currentTime = currentplaytime;
                }
        }
    }, false);
            $('#sp-container').append(musictime);
            $('#sp-container').append(musicname);
            document.getElementById('name').innerHTML = playersongname;
            $('#sp-container').append(spplayerTemplate);
            document.getElementById("Play").style.display ="none";
            masterDaw = new Daw();
        }
    };

    //These sources could eventually be loaded from the server
    var sources = [
        //'Vox.mp3', 'Strings.mp3','Acous_Gtr.mp3','Bass_&_Drums.mp3'
        'Acous_Gtr.mp3', 'Strings.mp3','Bass_&_Drums.mp3', 'Mellotron.mp3','Bck_vox.mp3','Stylophone.mp3','Vox.mp3','Flute_&_Cello.mp3'

    ];
    var sources2 = [
        //'Vox.mp3', 'Strings.mp3','Acous_Gtr.mp3','Bass_&_Drums.mp3'
        'Acous_Gtr.mp3', 'Strings.mp3','Bass_&_Drums.mp3', 'Mellotron.mp3','Bck_vox.mp3','Stylophone.mp3','Vox.mp3','Flute_&_Cello.mp3'

    ];
    var listenerimagesource = 'listener.png';
    var imagesources = ['guitar.png','strings.png','drum.png','mellotron.png','vox_back.png','mellotron.png','vox_main.png','flute.png'];
    var imagesources = ['note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png','note.png']
    var listenerimageurl; imageurl = new Array(sources.length);
    
    var channelTemplate = '<div class="channel"></div>';
    var rotaryKnobTemplate = '<div class="dial-container"><div class="notches"></div><div class="dial"><div class="dial-inner"></div></div></div>';
    var transportTemplate = '<div id="transport"><h1><span>&#9835; Web Audio</span> mixer</h1><div id="display"><div id="time-min">00</div><span>:</span><div id="time-secs">00</div><span>:</span><div id="time-milli">00</div><div class="clear"></div></div><div class="controls"><button id="play">&#9658;</button><button id="pause">||</button></div></div>';
    
    //var volumeslider = '<input type="range" id="musicslider" value="50" min="0" max="99"/>';
    var seekbar = '<div id="seekbar"></div>';
    var musictime = '<div id="time"><span id="current">00:00</span><span id="duration">00:00</span></div>';
    var musicname = '<div id="name"></div>';
    var spplayerTemplate = '<div id="playerbutton"><img src="images/surround.png" class="surroundButton" id="surroundbutton"><button class="spRewind" type="button">◀︎◀︎</button><button id = "Play" class="spPlay" type="button">▶︎</button><button id = "Pause" class="spPause" type="button">||</button><button class="spFF" type="button">▶︎▶︎</button><img src="images/playlist2.png" class="playlistButton"></div>';
    var spplayerTime = '<div id="time-min">00</div><span>:</span><div id="time-secs">00</div><span>:</span><div id="time-milli">00</div>';
    //$('#sp-container').append(spplayerTemplate);
    //$('#slider').append(volumeslider);
    //$('.spRewind').on('click', init());


    //console.log(musicdoc);
    //console.log(musicdata);
    
    // EventListeners
    window.addEventListener('load', PlayList, false);
    canvas.addEventListener('mousedown', onDown, false);
    canvas.addEventListener('touchstart', function(e){
        spFlag = true;
        e.preventDefault();
        onDown(e);
        }
        , false);
    canvas.addEventListener('contextmenu', onRightDown, false);
    canvas.addEventListener('mousemove', onmove, false);
    canvas.addEventListener('touchmove', function(e){
        spFlag = true;
        e.preventDefault();
        if (e.touches.length == 1){
            onmove(e);
        }else{
            onRightDown(e);
        }
    }
        , false);
    canvas.addEventListener('mouseup', onUp, false);
    canvas.addEventListener('touchend', function(e){
        spFlag = true;
        e.preventDefault();
        onUp(e);
    }
        , false);
    window.addEventListener('deviceorientation', function(e) {
        alpha = e.alpha,
        beta  = e.beta,
        gamma = e.gamma;
        //document.write(alpha,beta,gamma);
    }, false);

    

})();