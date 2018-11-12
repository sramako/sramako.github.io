//MODAL

// Get the modal
var modal = document.getElementById('modal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks on <span> (x), close the modal
closeform = function() {
	console.log("CLOSE");
	$("#view").show();
	document.getElementById('modal').style.display = "none";
	document.getElementById("search").value="";
}


//ADD ELEMENT

function openSelector() {
        document.getElementById("myForm").style.display = "block";
}

function closeSelector() {
        document.getElementById("myForm").style.display = "none";
}

//GENERATE A PREVIEW

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

options = new Object();
studentForm = new Object();
formData = new Array();
q = new Array();
qs = new Array();
appState = 0;
companyName = "";

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

addStudentElement = function( count, que, res ) {
        var element = angular.element("<div id="+count+"  class=form-element >"+"</div>");
        var target = document.getElementById('postview');
        angular.element(target).append(element);

        $("#"+count).append("<h1>"+que+"</h1>");
        qs[count-1] = que;
		console.log(qs);

        if(res=="Text"){
                // $("#preview").append("<input type=\"text\" ng-model=\"e.q"+count+"\"/>");
                $("#"+count).append("<input type=\"text\" ng-model=\"e.q"+count+"\" name=\""+que+"\"></html>");
				studentForm[que] = new Array(new Object({"type":res}));
        }
        if(res=="Radio"){
                var optlen = options.length;
                for (var i = 0; i < optlen; i++) {
                    $("#"+count).append("<input type=radio name=\"" + que + "\" value=\"" + options[i] + "\">"+options[i]+"</h1><br />");
                }
				studentForm[que] = new Array(new Object({"type":res}),new Object({"values":options}));
        }
		if(res=="Checkbox"){
				qs[count-1] = que+"[]";
                var optlen = options.length;
                for (var i = 0; i < optlen; i++) {
                    $("#"+count).append("<input type=checkbox name=\"" + que + "[]\" value=\"" + options[i] + "\">"+options[i]+"</h1><br />");
                }
				 studentForm[que] = new Array(new Object({"type":res}), new Object({"values":options}));
        }
		if(res=="Date"){
                // $("#preview").append("<input type=\"text\" ng-model=\"e.q"+count+"\"/>");
                $("#"+count).append("<input type=\"date\" name=\""+que+"\"></html>");
				studentForm[que] = new Array(new Object({"type":res}));
        }
        //PARSE OTHER TYPES

		console.log(JSON.stringify(studentForm));

}

createStudentForm = function() {
	alert("CAught");
	console.log(companyName);
	// $.post("https://ppdb-ep.herokuapp.com/savetemplate",
	// {
	// 	"company":companyName,
	// 	"form":studentForm
	// },
	// function(data) {
	// 	console.log(JSON.stringify(data));
	// 	swal("Form Sent!");
	// 	window.location.href = "announcements.html"
	// });
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
								if(appState==0) {
                                	addElement($scope.count,key,val[0].type);
								}
								else {
									addStudentElement($scope.count,key,val[0].type);
								}
                        });
                });
			}
		$scope.load2 = function() {
				$.getJSON('sample-data/c2.json',function(data){
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
                                addStudentElement($scope.count,key,val[0].type);
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
				var flag=0;
				if($scope.checkMultiple()) {
					// console.log("HERE"+$("#ntimes").val());
					var opt = new Array();
					var n=$("#ntimes").val();
					for( var i=0; i<n; i++ ) {


						opt.push(prompt("Enter"));

						// swal("Write something here:", {
						//   content: "input",
						// })
						// .then((value) => {
						//   // do something with value variable
						//   opt.push(value);
						//   console.log(value);
						//   if(i==n-1) {
						// 	  flag=1;
						//   }
						// });
					}

					options=opt;
				}

				// function sleep (time) {
				// 	return new Promise((resolve) => setTimeout(resolve, time));
				// }
				//
				// while( flag==0; ) {
				// 	sleep(500).then(() => {
				//
				// 	      // Do something after the sleep!
				// 		  console.log("Waiting");
				// 	  })
				// }
				// while(flag==0) {
				// 	demo();
				// }
				if(appState==0) {
                	addElement($scope.count,$scope.elem.que,$scope.elem.res);
				}
				else {
					addStudentElement($scope.count,$scope.elem.que,$scope.elem.res);
				}
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
				if($scope.elem.res=="Checkbox")
                        return true;
                return false;
        };
        $scope.reload = function() {
                var $form = $("#preview");
                var data = getFormData($form);
                $("#sample").empty();
				$("#modal").css("display","block");
                console.log(data);
				console.log(data["Company"]);
                var len = q.length;
				$("#view").hide();
				companyName = data[q[0]];
                for (var i = 0; i < len; i++) {
                        f="<div>"+q[i]+" : "+data[q[i]]+"</div>";
                        $("#sample").append(f);
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

		eventposted=0;

		 $(document).ready(function() {
		   $('#submit').click(function() {
			   if(eventposted==0) {
				   console.log("Hi"+eventposted);
		     		foo();
			}
		   });
		 });

		 function foo() {
			 swal("Company Added!");
			 console.log("Alerted");
		     eventposted=1;
			 appState=1;

			 $("#preview").css("overflow","hidden");
			 $("#postview").css("overflow-y","scroll");
			 $("#view2").show();
			 $("#disable").hide();
		 	$("#submit").hide();
			$("#close").hide();
			load2();
		 }
});
