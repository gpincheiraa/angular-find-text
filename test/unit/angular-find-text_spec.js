(function() {
  'use strict';
  
  /* Directive Testing */
  describe('Angular find text directive',findTextDirectiveSpec);

  function findTextDirectiveSpec(){

    //////////////  GLOBALS   ////////////////////////////////
    var el, compileService, rootScope, scope, compiledEl, domElement, rawHtmlString, $ctrl;
    //////////////  BEFORE EACH ////////////////////////////////
    beforeEach(module('gp.findText'));
    beforeEach(inject(eachSpec));

    function eachSpec($compile, $rootScope){
      compileService = $compile;
      rootScope = $rootScope;

      rawHtmlString = '<div>\
                        <gp-find-text selector="span.code"></gp-find-text>\
                        <span class="code">1</span>\
                        <span class="code">2</span>\
                        <span class="code">3</span>\
                        <span class="code">4</span>\
                      </div>';
      
      domElement = angular.element(rawHtmlString);
    }


    //////////////////   HELPERS //////////////////////////////////
    function searchProcess(_searched){
      scope = rootScope.$new();
      
      compiledEl = compileService(domElement)(scope);
      scope.$apply();
      
      //search the directive in the html 
      $ctrl = angular.element(compiledEl.find('gp-find-text')).controller('gpFindText');


      var elements = Array.prototype.slice.call(compiledEl.find($ctrl.selector));
      
      $ctrl.searchedValue = _searched;
      $ctrl.searchText($ctrl.searchedValue);

      elements =  elements
                    .map(function(el){
                      return angular.element(el);
                    })
                    .filter(function(el){
                      return el.is('.matched');
                    });

      return elements;
    }



    //////////////////   SPECS //////////////////////////////////
    it('1. Should be raise error if a selector it\'s not provided', spec1);
    
    function spec1(){
      scope = rootScope.$new();
      
      compiledEl = compileService(angular.element('<gp-find-text></gp-find-text>'))(scope);
      expect(scope.$apply).toThrow();
    }

    it('2. Should be set a class provided as attribute', spec2);
    
    function spec2(){

      var $ctrl;

      scope = rootScope.$new();
      
      compiledEl = compileService(angular.element('<gp-find-text selector="td.code" matched-class="matched-code"></gp-find-text>'))(scope);
      scope.$apply();

      $ctrl = compiledEl.controller('gpFindText');

      expect($ctrl.matchedClass).toBe('matched-code');
    }


    it('3. Should be set a default class "matched" if a class isn\'t provided', spec3);
    
    function spec3(){
      scope = rootScope.$new();
      
      compiledEl = compileService(angular.element('<gp-find-text selector="td.code"></gp-find-text>'))(scope);
      scope.$apply();

      $ctrl = compiledEl.controller('gpFindText');

      expect($ctrl.matchedClass).toBe('matched');
    }

    it('4. Should be raise error if a selector provided it\'s not valid', spec4);
    
    function spec4(){
      scope = rootScope.$new();
      
      compiledEl = compileService(angular.element('<gp-find-text selector="!"></gp-find-text>'))(scope);
      expect(scope.$apply).toThrow();

    }

    it('5. Should be raise error if a element if it\'s not provided ', spec5);
    
    function spec5(){
      scope = rootScope.$new();
      
      compiledEl = compileService(angular.element('<gp-find-text selector="#td"></gp-find-text>'))(scope);
      expect(scope.$apply).toThrow();

    }


    it('6. Should be add a class to element that contains a matched text ', spec6);
    
    function spec6(){
      var element = searchProcess('1');
      
      expect(element[0].text()).toBe($ctrl.searchedValue);
    }

    it('7. Should be toggle open state and set to empty the searched value when closes', spec7);

    function spec7(){
      scope = rootScope.$new();
      
      compiledEl = compileService(angular.element('<gp-find-text selector="td.code"></gp-find-text>'))(scope);
      scope.$apply();

      $ctrl = compiledEl.controller('gpFindText');

      //test 1 open
      var openValue = $ctrl.open;
      $ctrl.toggleOpen();
      expect($ctrl.open).toBe(true);

      //test 2 close
      openValue = $ctrl.open;
      $ctrl.toggleOpen();
      expect($ctrl.open).toBe(false);
      expect($ctrl.searchedValue).toBe('');
    }

    it('8. Should be remove the target class if the searched value it\'s set to "" ', spec8);

    function spec8(){
      var elementMatched = searchProcess('1');

      //TEST 1
      $ctrl.checkEmpty('1');

      expect(elementMatched[0].hasClass('matched')).toBe(true);

      //TEST 2
      $ctrl.checkEmpty('');

      expect(elementMatched[0].hasClass('matched')).toBe(false);
    }

  }


})();