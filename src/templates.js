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
