(function(window, angular, undefined) {
  'use strict';
  
  //Main module
  angular
    .module('gp.findText', ['duScroll']);
    
  //A generated template by jade preprocessor
	//directive:template
	angular.module('gp.findText').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/views/angular-find-text.html',
    '\n' +
    '<div ng-class="{closed: !$ctrl.open}" class="form29-search">\n' +
    '  <div ng-click="$ctrl.open = !$ctrl.open" class="closed-search"><i class="fa fa-search fa-lg"></i></div>\n' +
    '  <form ng-submit="$ctrl.searchText($ctrl.searchedValue)" class="opened-search">\n' +
    '    <div ng-click="$ctrl.toggleOpen()" class="form-group col-xs-12 hide-search"><i ng-bind="$ctrl.hideText" class="fa fa-reply"></i></div>\n' +
    '    <div class="form-group col-xs-12">\n' +
    '      <input placeholder="{{$ctrl.searchPlaceholder}}" ng-model="$ctrl.searchedValue" ng-change="$ctrl.checkEmpty($ctrl.searchedValue)" class="form-control">\n' +
    '    </div>\n' +
    '    <div class="form-group col-xs-12 submit-search">\n' +
    '      <button type="submit" ng-disabled="!$ctrl.searchedValue" ng-bind="$ctrl.submitText" class="btn btn-success"></button>\n' +
    '    </div>\n' +
    '  </form>\n' +
    '</div>'
  );

}]);

	//endtemplate


  //Provider
  angular
    .module('gp.findText')
    .provider('FindText', provider);

  function provider(){

    var self = this,
        options = {
          matchedClass: 'matched',
          submitText: 'Find',
          searchPlaceholder: 'Type a search...',
          hideText: 'Hide'
        };

    self.matchedClass = function(_matchedClass){
      options.matchedClass = _matchedClass;
    };
    self.submitText = function(_submitText){
      options.submitText = _submitText;
    };
    self.searchPlaceholder = function(_searchPlaceholder){
      options.searchPlaceholder = _searchPlaceholder;
    };

    self.hideText = function(_hideText){
      options.hideText = _hideText;
    };

    self.$get = getter;

    function getter(){
      return options;
    }
  }

  //Directive
  angular
    .module('gp.findText')
    .directive('gpFindText', directive);
  
  directive.$inject = ['$document', '$compile', 'FindText'];

  function directive($document, $compile, FindText){
    
    var ddo = {
      controller: function(){},
      controllerAs: '$ctrl',
      bindToController: true,
      link: link,
      restrict: 'E',
      templateUrl: 'assets/views/angular-find-text.html',
      scope: {
        selector: '@',
        matchedClass: '@'
      }
    };
    return ddo;
    
    function link(scope, element, attrs, $ctrl){
      
      if(!$ctrl.selector)
        throw 'provide a selector in this directive.';
      
      //jquery match to array using .find() method on the parent of the directive
      var targetElements = Array.prototype.slice.call(element.parent().find($ctrl.selector));
      //"jquerize" matched elements
      targetElements = targetElements.map(jquerizeElements);
      
      //initial values
      $ctrl.open = false;
      $ctrl.matchedClass =  $ctrl.matchedClass || FindText.matchedClass;
      $ctrl.submitText = FindText.submitText;
      $ctrl.searchPlaceholder = FindText.searchPlaceholder;
      $ctrl.hideText = FindText.hideText;
      
      //functions
      $ctrl.searchText = search;
      $ctrl.toggleOpen = toggle;
      $ctrl.checkEmpty = checkEmpty;
      
      function search(_code){
        targetElements.forEach(function($el){
          if(_code === $el.text()){
            $el.addClass($ctrl.matchedClass);
            $document.scrollToElement($el, 250, 800);
          }
          else{
            resetSearched($el);
          }
        });
      }

      function toggle(){
        $ctrl.open = !$ctrl.open;
        if(!$ctrl.open){
          $ctrl.searchedValue = '';
          targetElements.forEach(resetSearched);
        }
      }

      function checkEmpty(_code){
        if(!_code){
          targetElements.forEach(resetSearched);
        }
      }
      
      function jquerizeElements(el){
        return angular.element(el);
      }
      
      function resetSearched(el){
        el.removeClass($ctrl.matchedClass);
      }

    }
  }

})(window, angular);