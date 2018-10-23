// Copyright (C) 2015-Today GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
//  License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

"use strict";

angular.module('mobile_app_purchase').controller(
    'PartnerCtrl', [
    '$scope', '$filter', '$state', '$stateParams','PartnerModel', 'PurchaseOrderModel', 'ProductModel',
    function ($scope, $filter, $state, $stateParams, PartnerModel, PurchaseOrderModel, ProductModel) {
    $scope.data = {
        'partner_list': [],
        'partner_filter': null,
    };

    $scope.$on(
        '$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
        if ($state.current.name === 'partner') {
            $scope.data.partner_filter = null;
            PartnerModel.get_list().then(function(partner_list) {
                $scope.data.partner_list = partner_list;
            });
        }
    });

    $scope.select_partner = function (partner) {
        // Create Purchase order
        PurchaseOrderModel.create_purchase_order(partner).then(function(purchase_order){
            // Load Products
            ProductModel.get_list(purchase_order).then(function(product_list) {
                $state.go('product', {purchase_order_id: purchase_order.id});
            });
        });

    };

}]);
