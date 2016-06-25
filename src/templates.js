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
