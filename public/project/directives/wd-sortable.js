(function () {
    angular
        .module('Draggable', [])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable () {
        function linkFunction (scope, element) {
            $(element).sortable();

            $(element).on('sortdeactivate', function (event, ui) {
                var from = angular.element(ui.item).scope().$index;
                var to = element.children().index(ui.item);
                scope.$emit('allSorted', {from: from, to: to})
            })
        }
        return {
            link: linkFunction
        }
    }
})()
