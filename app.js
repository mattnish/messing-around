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
    var bgColorsArray   = options.bgColors;
    this.innerText      = $(element).text();
    this.totalBGs       = bgColorsArray.length;
    this.countInArray   = 0;
    this.$el            = $(element);
    
    this.$el.css('background-color', bgColorsArray[this.countInArray]);
    var nextFunc = function(){
        setTimeout(function(){
          this.nextThing(this.nextColor(bgColorsArray));
          nextFunc();
        }.bind(this), 4000);
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
                        this.innerText +
                      '</div>'+
                    '</div>');
      this.$el.after($div);
      setTimeout(function(){
        this.$el.parent().find('.cool-container:not(showing)').addClass('showing').prev().addClass('transition-out');
      }.bind(this),100);
      setTimeout(function(){
        this.$el = this.$el.parent().find('.cool-container.upcoming');
        this.$el.removeClass('upcoming').prev().remove();
      }.bind(this),2100);
      
    }
  }
  
})(jQuery, window, document);