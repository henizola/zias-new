/*
    Name: YouTubePopUp | Video PopUp - Premium Extension
    Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
    Version: 1.0.8
    Plugin URL: https://wp-time.com/youtube-popup-jquery-plugin/
    Written By: Qassim Hassan
    Twitter: @QQQHZ
    Websites: wp-time.com | qass.im | wp-plugins.in
    Dual licensed under the MIT and GPL licenses:
        http://www.opensource.org/licenses/mit-license.php
        http://www.gnu.org/licenses/gpl.html
    Copyright (c) 2018 - Qassim Hassan
*/

(function ( $ ) {
 
    $.fn.YouTubePopUp = function(options) {

        var YouTubePopUpOptions = $.extend({
                autoplay: 1
        }, options );


        function vpConvertHextToRGBA(hex,opacity){
            hex = hex.replace('#','');
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);

            result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
            return result;
        }


        $(this).on('click', function (e) {

            var youtubeLink = $(this).attr("href");

            var startingTime = $(this).attr('data-time');

            var endingTime = $(this).attr('data-endtime');

            var disIV = $(this).attr('data-iv');

            var widthSize = $(this).attr('data-width');

            var heightSize = $(this).attr('data-height');

            var overlayColor = $(this).attr('data-overlay');

            var relVideos = $(this).attr('data-relvid');

            var disControls = $(this).attr('data-controls');

            var disWrap = $(this).attr('data-dwrap');

            var dataSoundCloud = $(this).attr('data-soundcloud');

            var videoType = ' vp-vt-youtube';

            var yt_rel_exten = $(this).attr("wpt-video-p");

            if( overlayColor ){
                var get_overlay_color = vpConvertHextToRGBA(overlayColor, 80);
                var set_overlay_style = ' background-color: '+get_overlay_color+' !important;';
                if( overlayColor == '#ffffff' ){
                    var vpDarkIcon = ' vp-dark-ci';
                    var vpDarkBG = ' vp-dark-bg';
                }else{
                    var vpDarkIcon = '';
                    var vpDarkBG = '';
                }
            }else{
                if( video_popup_general_settings.o_color ){
                    if( video_popup_general_settings.o_color == '#ffffff' ){
                        var vpDarkIcon = ' vp-dark-ci';
                        var vpDarkBG = ' vp-dark-bg';
                    }else{
                        var vpDarkIcon = '';
                        var vpDarkBG = '';
                    }
                    var get_overlay_color = vpConvertHextToRGBA(video_popup_general_settings.o_color, 80);
                    var set_overlay_style = ' background-color: '+get_overlay_color+' !important;';
                }else{
                    var set_overlay_style = null;
                    var vpDarkIcon = '';
                    var vpDarkBG = '';
                }
            }

            if( relVideos || $(this).hasClass('vp-dr') || yt_rel_exten == 1 ){
                var relVidParam = '&rel=0';
            }else{
                var relVidParam = '&rel=1';
            }

            if( disControls ){
                var disControlsParam = '&controls=0';
            }else{
                var disControlsParam = '&controls=1';
            }

            if( disIV ){
                var disIVParam = '&iv_load_policy=3';
            }else{
                var disIVParam = '&iv_load_policy=1';
            }

            if ( youtubeLink.match(/(youtube.com)/) || youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(vimeo.com)/) ) {

                if( youtubeLink.match(/(youtube.com)/) ){
                    var split_c = "v=";
                    var split_n = 1;
                }

                if( youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(vimeo.com\/)+[0-9]/) ){
                    var split_c = "/";
                    var split_n = 3;
                }

                if( youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/) ){
                    var split_c = "/";
                    var split_n = 5;
                }

                var getYouTubeVideoID = youtubeLink.split(split_c)[split_n];

                var cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

                if( youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(youtube.com)/) ){
                    if( startingTime ){
                        var getTime = '&start='+startingTime+'';
                    }else{
                        var getTime = '&start=0';
                    }

                    if( endingTime ){
                        var getEndTime = '&end='+endingTime+'';
                    }else{
                        var getEndTime = '';
                    }
                    var videoEmbedLink = "https://www.youtube.com/embed/"+cleanVideoID+"?autoplay="+YouTubePopUpOptions.autoplay+relVidParam+getTime+disControlsParam+getEndTime+disIVParam+"";
                    var iframe_element = '<iframe src="'+videoEmbedLink+'" allow="autoplay" allowfullscreen></iframe>';
                }

                if( youtubeLink.match(/(vimeo.com\/)+[0-9]/) || youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/) ){
                    var videoEmbedLink = "https://player.vimeo.com/video/"+cleanVideoID+"?autoplay="+YouTubePopUpOptions.autoplay+"";
                    var iframe_element = '<iframe src="'+videoEmbedLink+'" allow="autoplay" allowfullscreen></iframe>';
                    var videoType = ' vp-vt-vimeo';
                }

            }else{
                if( dataSoundCloud ){
                    var data_embed_sc = $(this).attr('data-embedsc');
                    var iframe_element = '<iframe src="'+data_embed_sc+'" allow="autoplay" allowfullscreen></iframe>';
                    var videoType = ' vp-vt-soundcloud';
                }else{
                    if( YouTubePopUpOptions.autoplay == 1 ){
                        var locally_options = 'controls autoplay controlsList="nodownload"';
                    }else{
                        var locally_options = 'controls controlsList="nodownload"';
                    }
                    var iframe_element = '<video '+locally_options+'><source src="'+youtubeLink+'" type="video/mp4"></video>';
                    var videoType = ' vp-vt-locally';
                }
            }

            if( widthSize ){
                var getWidthSize = widthSize;
            }else{
                if( video_popup_general_settings.width_s ){
                    var getWidthSize = video_popup_general_settings.width_s;
                }else{
                    var getWidthSize = '880';
                }
            }

            if( heightSize ){
                var getHeightSize = heightSize;
            }else{
                if( video_popup_general_settings.height_s ){
                    var getHeightSize = video_popup_general_settings.height_s;
                }else{
                    var getHeightSize = '440';
                }
            }

            if( disWrap || $(this).hasClass('vp-dw') || video_popup_general_settings.r_border ){
                var disWrapClass = ' vp-flex-no-border';
            }else{
                var disWrapClass = '';
            }

            $("body").append('<div style="display:none;'+set_overlay_style+'" class="YouTubePopUp-Wrap VideoPopUpWrap"></div>');

            $(".VideoPopUpWrap").fadeIn(300);

            $(".VideoPopUpWrap").append('<div class="Video-PopUp-Content"><div style="max-width:'+getWidthSize+'px; height:'+getHeightSize+'px;" class="vp-flex'+vpDarkBG+disWrapClass+videoType+'"><span class="YouTubePopUp-Close'+vpDarkIcon+'"></span>'+iframe_element+'</div></div>');


            $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function(){
                $(".YouTubePopUp-Wrap").fadeOut(300).delay(325).queue(function() { $(this).remove(); });
            });

            $('.vp-flex, .vp-flex *').click(function(e){
                e.stopPropagation();
            });

            e.preventDefault();

        });
        
        $(document).keyup(function(e) {

            if ( e.keyCode == 27 ){
                $('.YouTubePopUp-Close').click();
            }

        });

    };
 
}( jQuery ));