(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($rootScope, $scope, $routeParams, FieldService) {

        $scope.formId = $routeParams.formId;
        $scope.formTitle = $rootScope.currentUser.formName;
        $scope.modalField = {};
        $scope.formFields = {};

        $scope.fieldOptions = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "CheckBoxes Field",
            "Radio Buttons Field"
        ];

        if($rootScope.currentUser != null){
            FieldService.getFieldsForForm($scope.formId)
                .then(function(fields){
                    $scope.formFields = fields;
                });
        }

        $scope.addField = function(fieldType){

            if(fieldType != null) {
                var newField = {};
                if (fieldType == "Single Line Text Field") {
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                }
                else if (fieldType == "Multi Line Text Field") {
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                }
                else if (fieldType == "Date Field") {
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                }
                else if (fieldType == "Dropdown Field") {
                    newField = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                }
                else if (fieldType == "CheckBoxes Field") {
                    newField = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                }
                else if (fieldType == "Radio Buttons Field") {
                    newField = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                }

                FieldService.createFieldForForm($scope.formId, newField)
                    .then(function (response) {
                        $scope.formFields = response;
                    })
            }
        }


        $scope.deleteField = function(fieldId){
            FieldService.deleteFieldFromForm($scope.formId,fieldId)
                .then(function(response){
                    $scope.formFields = response;
                });
        }


        $scope.cloneField = function(field){
            FieldService.createFieldForForm($scope.formId,field)
                .then(function (response) {
                    $scope.formFields = response;
                });
        }

        $scope.editField = function(fieldId){
            FieldService.getFieldForForm($scope.formId,fieldId)
                .then(function(response){
                    $scope.modalField = response;
                    if(response.hasOwnProperty("options")) {
                        $scope.modalField.options = JSON.stringify($scope.modalField.options);
                    }
                });
        }

        $scope.parseField = function(newfield){
            if(newfield.hasOwnProperty("options")){
                newfield.options = JSON.parse(newfield.options);
            }
            FieldService.updateField($scope.formId,newfield._id,newfield)
                .then(function(response){
                    $scope.formFields = response;
                });
        }


        $scope.$watch('formFields', function (newValue, oldValue) {
            if(Object.keys(newValue).length !== 0 && Object.keys(oldValue).length !== 0 ){
                FieldService.rearrangeFields($scope.formId,newValue)
                    .then(function (response) {
                        $scope.formFields = response;
                    });
            }

        }, true);


    }

})();