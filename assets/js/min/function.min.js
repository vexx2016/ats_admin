/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
// (function (window) {
//     {
//         var unknown = '-';

//         // screen
//         var screenSize = '';
//         if (screen.width) {
//             width = (screen.width) ? screen.width : '';
//             height = (screen.height) ? screen.height : '';
//             screenSize += '' + width + " x " + height;
//         }

//         // browser
//         var nVer = navigator.appVersion;
//         var nAgt = navigator.userAgent;
//         var browser = navigator.appName;
//         var version = '' + parseFloat(navigator.appVersion);
//         var majorVersion = parseInt(navigator.appVersion, 10);
//         var nameOffset, verOffset, ix;

//         // Opera
//         if ((verOffset = nAgt.indexOf('Opera')) != -1) {
//             browser = 'Opera';
//             version = nAgt.substring(verOffset + 6);
//             if ((verOffset = nAgt.indexOf('Version')) != -1) {
//                 version = nAgt.substring(verOffset + 8);
//             }
//         }
//         // Opera Next
//         if ((verOffset = nAgt.indexOf('OPR')) != -1) {
//             browser = 'Opera';
//             version = nAgt.substring(verOffset + 4);
//         }
//         // MSIE
//         else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
//             browser = 'Microsoft Internet Explorer';
//             version = nAgt.substring(verOffset + 5);
//         }
//         // Chrome
//         else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
//             browser = 'Chrome';
//             version = nAgt.substring(verOffset + 7);
//         }
//         // Safari
//         else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
//             browser = 'Safari';
//             version = nAgt.substring(verOffset + 7);
//             if ((verOffset = nAgt.indexOf('Version')) != -1) {
//                 version = nAgt.substring(verOffset + 8);
//             }
//         }
//         // Firefox
//         else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
//             browser = 'Firefox';
//             version = nAgt.substring(verOffset + 8);
//         }
//         // MSIE 11+
//         else if (nAgt.indexOf('Trident/') != -1) {
//             browser = 'Microsoft Internet Explorer';
//             version = nAgt.substring(nAgt.indexOf('rv:') + 3);
//         }
//         // Other browsers
//         else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
//             browser = nAgt.substring(nameOffset, verOffset);
//             version = nAgt.substring(verOffset + 1);
//             if (browser.toLowerCase() == browser.toUpperCase()) {
//                 browser = navigator.appName;
//             }
//         }
//         // trim the version string
//         if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
//         if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
//         if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

//         majorVersion = parseInt('' + version, 10);
//         if (isNaN(majorVersion)) {
//             version = '' + parseFloat(navigator.appVersion);
//             majorVersion = parseInt(navigator.appVersion, 10);
//         }

//         // mobile version
//         var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

//         // cookie
//         var cookieEnabled = (navigator.cookieEnabled) ? true : false;

//         if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
//             document.cookie = 'testcookie';
//             cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
//         }

//         // system
//         var os = unknown;
//         var clientStrings = [
//             {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
//             {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
//             {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
//             {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
//             {s: 'Windows Vista', r: /Windows NT 6.0/},
//             {s: 'Windows Server 2003', r: /Windows NT 5.2/},
//             {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
//             {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
//             {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
//             {s: 'Windows 98', r: /(Windows 98|Win98)/},
//             {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
//             {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
//             {s: 'Windows CE', r: /Windows CE/},
//             {s: 'Windows 3.11', r: /Win16/},
//             {s: 'Android', r: /Android/},
//             {s: 'Open BSD', r: /OpenBSD/},
//             {s: 'Sun OS', r: /SunOS/},
//             {s: 'Linux', r: /(Linux|X11)/},
//             {s: 'iOS', r: /(iPhone|iPad|iPod)/},
//             {s: 'Mac OS X', r: /Mac OS X/},
//             {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
//             {s: 'QNX', r: /QNX/},
//             {s: 'UNIX', r: /UNIX/},
//             {s: 'BeOS', r: /BeOS/},
//             {s: 'OS/2', r: /OS\/2/},
//             {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
//         ];
//         for (var id in clientStrings) {
//             var cs = clientStrings[id];
//             if (cs.r.test(nAgt)) {
//                 os = cs.s;
//                 break;
//             }
//         }

//         var osVersion = unknown;

//         if (/Windows/.test(os)) {
//             osVersion = /Windows (.*)/.exec(os)[1];
//             os = 'Windows';
//         }

//         switch (os) {
//             case 'Mac OS X':
//                 osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
//                 break;

//             case 'Android':
//                 osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
//                 break;

//             case 'iOS':
//                 osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
//                 osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
//                 break;
//         }

//         // flash (you'll need to include swfobject)
//         /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
//         var flashVersion = 'no check';
//         if (typeof swfobject != 'undefined') {
//             var fv = swfobject.getFlashPlayerVersion();
//             if (fv.major > 0) {
//                 flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
//             }
//             else {
//                 flashVersion = unknown;
//             }
//         }
//     }

//     window.jscd = {
//         screen             : screenSize,
//         browser            : browser,
//         browserVersion     : version,
//         browserMajorVersion: majorVersion,
//         mobile             : mobile,
//         os                 : os,
//         osVersion          : osVersion,
//         cookies            : cookieEnabled,
//         flashVersion       : flashVersion
//     };
// }(this));


/**
 * theme scripts
 */

(function ($) {
    "use strict";

    // $('body').addClass('os-' + window.jscd.os.toLowerCase())
    //     .addClass('browser-' + window.jscd.browser.toLowerCase())
    //     .attr('data-os-version', window.jscd.osVersion.toLowerCase());






      // anchor click
        $('.anchors-link').click(function () {
      		var $this = $(this),
      				href = $this.attr("href"),
      				topY = $(href).offset().top;
      				$('html, body').animate({
      				scrollTop: topY
      			}, 600);

      			return false;
      	});




        //SVG init
        function svgInit(){
          if($('body').hasClass('os-ios') || $('body').hasClass('os-android') || $('body').hasClass('browser-firefox')){

              $('svg').each(function () {
                  if ($(this).find('use').length) {
                      var symbolName = 'symbol' + $(this).find('use').attr('xlink:href'),
                          symbolString = symbolName.replace('symbol#', ''),
                          symbolEl = document.getElementById(symbolString),
                          className = $(this).attr('class');
                      if(!className){className='';}

                      var vb = symbolEl.getAttribute('viewBox'),
                          serializer = new XMLSerializer(),
                          str = serializer.serializeToString(symbolEl),
                          symbolHtml = '<svg class="'+className+'" ' + 'viewBox="' + vb + '">' + $(str).html() + '</svg>';

                      $(this).replaceWith(symbolHtml);

                  }
              });
          }
        }


        



          // SELECT

          //--------------------------------------

           jQuery(document).on('click', '.select dt', function (e) {

               e.preventDefault();

               var dl = jQuery(this).closest('dl.select');

               if ($(this).hasClass('active')) {
                   jQuery(document).find('.select').find('dt').removeClass('active');
                   jQuery(this).removeClass('active');

                   setTimeout(function () {
                       jQuery(dl).removeClass('select-active');
                   }, 0);

               }
               else {
                   var scrollCont, api;
                   var Selects = jQuery('.select-active');
                   if (Selects.length) {
                       jQuery(Selects).removeClass('select-active');
                   }
                   $(this).parent().addClass('select-active');
                   jQuery(document).find('.select').find('dt').removeClass('active');
                   jQuery(this).addClass('active');
                   if (jQuery(dl).hasClass('scrollable')) {
                       scrollCont = jQuery(this).parents('.select').find('.scroll-cont');
                       scrollCont.scrollbar();
                   }
               }
               return false;
           });

            

           jQuery(document).on('click', function (e) {
               if (!jQuery(e.target).closest('.select-active').length) {
                   var Selects = jQuery('.select-active');
                   if (Selects.length) {
                       setTimeout(function () {
                           jQuery(Selects).find('dt.active').removeClass('active');
                           jQuery(Selects).removeClass('select-active');
                           var scrollCont = Selects.find('.scroll-cont');
                       }, 0);
                   }
               }
           });

           jQuery(document).on('click ', '.select dd a', function (e) {

               if ($(this).hasClass('desel-label')) {
                   e.preventDefault();
                   e.stopPropagation();
                   return false;
               }

               var parent = jQuery(this).closest('.select'),
                   trigger = parent.find('dt');

               setTimeout(function () {
                   jQuery(parent).removeClass('select-active');
                   var scrollCont = parent.find('.scroll-cont');
               }, 0);

               parent.find('a').removeClass('current');
               jQuery(this).addClass('current');
               trigger.find('.input-block').addClass('not-empty');
               if(parseInt($(this).html()) > 0){
                 parent.addClass('select-selected');
               }else{
                 parent.removeClass('select-selected');
               }
               trigger.removeClass('active').find('input').val(($(this).html().replace('&lt;','<').replace('&gt;', '>')));
              // console.log($(this).html().replace('&lt;','<').replace('&gt;', '>'))
               if (parent.data('target-input') && jQuery(this).data('value') != null) {
                   jQuery(parent.data('target-input')).val(jQuery(this).data('value')).trigger('change');
               }


               return false;
           });





          svgInit();


             //  btn hamburger click

             $('.main-sidebar__hamburger').on('click',function(){
                $(this).toggleClass('minimize');
                if( $('.main-sidebar').hasClass('minimize') ){
                    $('.main-sidebar').removeClass('minimize')
                }else{
                    $('.main-sidebar').addClass('minimize')
                }
             });

             // page filters toggle
             // sidebar navigation btn
             $('.page-filters__btn').click(function() {
                if (!$(this).hasClass('opened')) {
                  $('.page-filters').slideUp()
                  $('.page-filters__btn.opened').removeClass('opened');
                }
                $('.page-filters').slideToggle();
                $(this).toggleClass('opened');
              }); 

             // sidebar navigation btn
             $('.navigation-btn').click(function() {
                if (!$(this).parent().hasClass('opened')) {
                  $('.navigation-head.opened').next('.navigation-list').slideUp()
                  $('.navigation-head.opened').removeClass('opened');
                }
                $(this).parent().next('.navigation-list').slideToggle();
                $(this).parent().toggleClass('opened');
              }); 

              // header search open
             $('.header-search__open').click(function() {
                $(this).parent().addClass('opened');
                $('.main-container__header').addClass('search');
              });
             $('.header-search__close').click(function() {
                $(this).parent().removeClass('opened');
                $('.main-container__header').removeClass('search');
              });

             // complete task
              $('.complete-task-btn').click(function() {
                $(this).parent().toggleClass('completed');
              });

              // base-btn-select_btn
              $('.base-btn-select_btn').click(function() {
                $(this).parent().toggleClass('active');
              });

              // input mask 
              // $(".datetime-mask").mask("00/00/0000 00:00", {placeholder: "__/__/____ --:--"});


              // popup open _btn
              $('.popup-btn__open').click(function() {
                if($(this).attr("data-popup")){
                  var attributeSelector = '.base-popup[data-popup="'+$(this).attr("data-popup")+'"]';
                  $(attributeSelector).addClass('opened');
                }else{
                  $('.base-popup:not([data-popup])').addClass('opened');
                }
              });
               // popup close _btn
              $('.popup-btn__close').click(function() {
                if($(this).attr("data-popup")){
                  var attributeSelector = '.base-popup[data-popup="'+$(this).attr("data-popup")+'"]';
                  $(attributeSelector).removeClass('opened');
                }else{
                  $('.base-popup:not([data-popup])').removeClass('opened');
                }
              });

              // table sorting btn
              $('.table-sorting__btn').click(function() {
                if($(this).hasClass('up')){
                  $(this).removeClass('up');
                  $(this).addClass('down');
                }else if($(this).hasClass('down')){
                  $(this).removeClass('down');
                }else{
                  $(this).addClass('up');
                }
              });


              // scroll bar init
              $(document).ready(function(){
                $('.scrollbar-inner').each(function() {
                  $(this).scrollbar();
                });
              });



              // base tabs
              $('.base-tab__btn').click(function() {
                var tn = '.base-tab__block[data-tabname="'+$(this).attr("data-tabname")+'"]';
                console.log(tn)
                $('.base-tab__block.active').removeClass('active')
                $('.base-tab__btn.active').removeClass('active')
                $(this).addClass('active')
                $(this).closest('.base-tab').find(tn).addClass('active')
              });



              // 
              $('.login-page__remember-pass').click(function(event) {
                event.preventDefault();
                $('.login-tabs').hide();
                $('.rember-pass-block').show();
              });
              $('.login-page__cancel-remember-pass').click(function(event) {
                event.preventDefault();
                $('.login-tabs').show();
                $('.rember-pass-block').hide();
              });




})(jQuery);
