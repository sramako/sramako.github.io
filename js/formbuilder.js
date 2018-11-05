options = new Object();

function openSelector() {
        document.getElementById("myForm").style.display = "block";
}

function closeSelector() {
        document.getElementById("myForm").style.display = "none";
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    console.log(unindexed_array);
    $.map(unindexed_array, function(n, i){
		if(n['name'] in indexed_array)
		{
        	indexed_array[n['name']] += ' , '+n['value'];
		}
		else {
			indexed_array[n['name']] = n['value'];
		}
    });

    return indexed_array;
}

formData = new Array();
q = new Array();

addElement = function( count, que, res ) {
        var element = angular.element("<div id="+count+"  class=form-element >"+"</div>");
        var target = document.getElementById('preview');
        angular.element(target).append(element);

        $("#"+count).append("<h1>"+que+"</h1>");
        q[count-1] = que;
        if(res=="Text"){
                // $("#preview").append("<input type=\"text\" ng-model=\"e.q"+count+"\"/>");
                $("#"+count).append("<input type=\"text\" ng-model=\"e.q"+count+"\" name=\""+que+"\"></html>");
        }
        if(res=="Radio"){
                var optlen = options.length;
                for (var i = 0; i < optlen; i++) {
                    $("#"+count).append("<input type=radio name=\"" + que + "\" value=\"" + options[i] + "\">"+options[i]+"</h1><br />");
                }
        }
		if(res=="Checkbox"){
				q[count-1] = que+"[]";
                var optlen = options.length;
                for (var i = 0; i < optlen; i++) {
                    $("#"+count).append("<input type=checkbox name=\"" + que + "[]\" value=\"" + options[i] + "\">"+options[i]+"</h1><br />");
                }
        }
		if(res=="Date"){
                // $("#preview").append("<input type=\"text\" ng-model=\"e.q"+count+"\"/>");
                $("#"+count).append("<input type=\"date\" name=\""+que+"\"></html>");
        }
        //PARSE OTHER TYPES
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
        $scope.count=0;
		$scope.events=new Array();
		$scope.today=new Date();
		$scope.message="Waiting for entry.";
        $scope.load = function() {
                console.log("Loading Form Template");

                $.getJSON('sample-data/formtemplate.json',function(data){
                        //console.log(data);
                        $.each(data, function(key,val){
                                //console.log(key);
                                //console.log(val[0].type);

                                $scope.count++;
                                if(Object.keys(val).length==2)
                                {
                                        options = val[1].values;
                                }
                                //console.log(options);
                                addElement($scope.count,key,val[0].type);
                        });
                });
        }

		$.getJSON('https://ppdb-ep.herokuapp.com/compdata', function(data) {
			console.log(Object.values(data));
			// $scope.events=Object.values(data);
			var ret = new Array();
			$scope.companies=new Array();
			var comp=Object.values(data);
			for( i in comp ) {
				if(comp[i]. Date) {
					// console.log(comp[i].Date);
					ret.push(comp[i].Date);
					$scope.companies.push(comp[i].Company);
				}
			}
			$scope.events=ret;
		});

        $scope.create = function() {
                $scope.count++;
                addElement($scope.count,$scope.elem.que,$scope.elem.res);
                formData[$scope.count] =  JSON.stringify($scope.elem);
                console.log(formData);
        };
        $scope.newElement = function() {
                console.log("Handled");
                console.log($scope.elem);
                closeSelector();
                $scope.create();
        };
        $scope.checkMultiple = function() {
                if ($scope.elem.re  == "undefined")
                        return false;
                if($scope.elem.res=="Radio")
                        return true;
                return false;
        };
        $scope.reload = function() {
                var $form = $("#preview");
                var data = getFormData($form);
                $("#postview").empty();
                console.log(data);
				console.log(data["Company"]);
                var len = q.length;
                for (var i = 0; i < len; i++) {
                        f="<div>"+q[i]+" : "+data[q[i]]+"</div>";
                        $("#postview").append(f);
                }
        };
		$scope.checkdate = function() {
			var len = $scope.events.length;
			for(i=0;i<len;i++)
			{
				var str=$scope.events[i];
				var d = str.split("-");
				var dt = new Date(d[0]+"/"+d[1]+"/"+d[2]);
				console.log("Check : "+dt);
				if( dt.getTime()==$scope.date.getTime() ) {
					$scope.message="Date already taken by "+$scope.companies[i];
					return true;
				}
			}
			if( $scope.date<$scope.today ) {
				$scope.message="Invalid Date";
				return true;
			}
			if($scope.today>$scope.date) {
				return true;
			}
			if($scope.date) {
				$scope.message="Valid";
			}
			return false;
		}

		var eventposted=0;

		 $(document).ready(function(){
		   $('#submit').click(function() {
		     window.setInterval(foo, 100);
		   });
		 });

		 function foo(){
			 swal("Form Submitted");
		     window.location = "announcements.html";
		     eventposted=1;
		 }
});
