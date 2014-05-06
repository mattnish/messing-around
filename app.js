;(function ( $, window, document, undefined ) {
  "use strict";
  
  $(function(){
    $('.cool-container').somethingCool({
      bgColors: ['#5fc082','#333333', '#3AAAC9']
    });
  });
  
  $.fn.somethingCool = function(options){
    return this.each(function() {
      var somethingCool = new SomethingCool(this, options);
    });
  };
  
  var SomethingCool = function(element,options){
    var bgColorsArray   = options.bgColors,
        date            = new Date(),
        hours           = date.getHours(),
        minutes         = date.getMinutes();
    this.timeString     = this.translateTime(hours,minutes);
    this.totalBGs       = bgColorsArray.length;
    this.countInArray   = 0;
    this.$el            = $(element);
    
    this.$el.css('background-color', bgColorsArray[this.countInArray]);
    this.$el.find('.cool-time').text(this.timeString);
    
    var nextFunc = function(){
        setTimeout(function(){
          var date            = new Date(),
              hours           = date.getHours(),
              minutes         = date.getMinutes();
          this.timeString     = this.translateTime(hours,minutes);
          this.nextThing(this.nextColor(bgColorsArray));
          nextFunc();
        }.bind(this), 4100);
    }.bind(this);
    nextFunc();
  }
  
  SomethingCool.prototype = {
    nextColor: function(array){
      (this.countInArray == (this.totalBGs-1)) ? this.countInArray = 0 : this.countInArray++;
      return array[this.countInArray];
    },
    nextThing: function(nextBG){
      //console.log('testing', this.$el);
      var $div = ('<div class="cool-container upcoming" style="background-color:'+nextBG+'">'+
                      '<div class="cool-wrap">'+
                        this.timeString +
                      '</div>'+
                    '</div>');
      this.$el.after($div);
      setTimeout(function(){
        this.$el.parent().find('.cool-container:not(showing)').addClass('showing').prev().addClass('transition-out');
      }.bind(this),100);
      setTimeout(function(){
        this.$el = this.$el.parent().find('.cool-container.upcoming');
        this.$el.removeClass('upcoming').prev().remove();
      }.bind(this),4100);
      
    },
    translateTime: function(hours, minutes){
      var isPM = false;
      if(hours >= 12){
        if(hours !== 24){
          isPM = true;
        }
        if(hours !== 12){
          hours -= 12;
        }
      }
      if((minutes + '').length == 1){
        minutes = 0 + '' + minutes;
      }
      
      return (isPM) ? (hours + ":" + minutes + " PM") : (hours + ":" + minutes + " AM");
    }
  }
  
})(jQuery, window, document);