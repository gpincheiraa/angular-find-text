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
    '  <form ng-submit="$ctrl.searchCode($ctrl.searchedValue)" class="opened-search">\n' +
    '    <div ng-click="$ctrl.toggleOpen()" class="form-group col-xs-12 hide-search"><i class="fa fa-reply"></i>Ocultar</div>\n' +
    '    <div class="form-group col-xs-12">\n' +
    '      <input placeholder="Código a buscar" ng-model="$ctrl.searchedValue" ng-change="$ctrl.checkEmpty($ctrl.searchedValue)" class="form-control">\n' +
    '    </div>\n' +
    '    <div class="form-group col-xs-12 submit-search">\n' +
    '      <button type="submit" ng-disabled="!$ctrl.searchedValue" class="btn btn-success">Buscar Código </button>\n' +
    '    </div>\n' +
    '  </form>\n' +
    '</div>'
  );

}]);

	//endtemplate


  //Directive
  angular
    .module('gp.findText')
    .directive('gpFindText', directive);
  
  directive.$inject = ['$document'];

  function directive($document){
    
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
      $ctrl.matchedClass =  $ctrl.matchedClass || 'matched';

      var matchedPattern = $ctrl.selector.match(/([a-z0-9]+)|([\#\.]\w+)/gi);

      if(!matchedPattern)
        throw 'selector aren\'t valid selector.';

      //should be compare with all the tags possible in HTML5
      var elementToMatch = (/^\W/).test(matchedPattern[0]) ? null : matchedPattern[0];
      
      if(!elementToMatch)
        throw 'please provide a valid element.';

      var classesToMatch = matchedPattern.slice(1).filter(function(selectors){
            return (/^\./).test(selectors);
          }),
          targetElements = Array.prototype.slice.call(element.parent().find(elementToMatch));
      
      $ctrl.open = false;
      $ctrl.searchText = search;
      $ctrl.toggleOpen = toggle;
      $ctrl.checkEmpty = checkEmpty;

      targetElements = targetElements.map(formatElements);
      targetElements = targetElements.filter(function(el){
        return el.is(classesToMatch.join(''));
      });
      
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
      
      function formatElements(el){
        return angular.element(el);
      }
      
      function resetSearched(el){
        el.removeClass($ctrl.matchedClass);
      }

    }
  }

})(window, angular);