       
	    var election_obj = function(gov_name,pol_st_pr,tot_val_vot,tot_invalid_vot,tot_blank,tot_votes,regis_voters,color1,color2){
	    this.gov_name = gov_name;
		this.pol_st_pr = pol_st_pr;
		this.tot_val_vot=tot_val_vot;
		this.tot_invalid_vot=tot_invalid_vot;
		this.tot_blank=tot_blank;
		this.tot_votes=tot_votes;
		this.regis_voters=regis_voters;
		this.print_info = fun_print;
		this.color1 = color1;
		this.color2= color2;
	    }
		
		function fun_print()
		{
		//alert( 1*this.tot_val_vot + 1*this.tot_invalid_vot);
		var pers = (( 1*this.tot_val_vot / (1*this.tot_val_vot+1*this.tot_invalid_vot) ) * 100 ) -15 ;
		var pers2 = (( 1*this.tot_invalid_vot / (1*this.tot_val_vot+1*this.tot_invalid_vot) ) * 100 ) +Math.floor((Math.random() * 100));  ;
		
		var   output_info  =    $('<dt></dt>').text(this.gov_name + " Governorate");	  
		var   output_info1 =	$('<dd></dd>').css("background-color", this.color2)	
											  .css("text-align","left")
		                                      .append('<div id="stat"><div id="stat2"><b> Polling Stations Processed: </b></div><div id="stat2">'+this.pol_st_pr+'</div></div>')
											  .append('<div id="stat"><div  id="stat2"><b>Total Blank: </b></div><div id="stat2">'+this.tot_blank+'</div></div>')	
											  .append('<div id="stat"><div  id="stat2"><b>Total Votes: </b></div><div id="stat2">'+this.tot_votes+'</div></div>')	
											  .append('<div id="stat"><div  id="stat2"><b>Registered Voters: </b></div><div id="stat2">'+this.regis_voters+'</div></div>')	
											  .append('<div id="stat"><div  id="stat2"><b>Total Valid Votes: </b></div><div id="stat2"><progress id="stat2" class="unique" value="'+pers+'" data-label="'+this.tot_val_vot+'" max="100"></progress></div></div>')											  
											  .append('<div id="stat"><div  id="stat2"><b>Total Invalid Votes: </b></div><div id="stat2"><progress id="stat2" class="unique" value="'+pers2+'" data-label="'+this.tot_invalid_vot+'" max="100"></progress></div></div>')											  
											
		
		//output_info1.css("background-color", "gold").css("text-align","left") ;
	
		return output_info.add(output_info1);
		}
		var governances = []; 
		
		$( document ).ready(function() {
			
										$('html').addClass('js');
	
										$.getJSON( "json-files/elections.json").done( function(obj) { 
																			
																			$.each(obj, function(key, value) { 
																						
																							
																							governances.push(new election_obj(value.city,value.polling_stations_processed,value.total_valid_votes,value.total_invalid_votes,value.total_blank,value.total_votes,value.registered_voters,value.bgcolorh,value.bgcolorc));
																							
																						});
   
																			governances.sort(function(a, b) {
																								if (a.gov_name < b.gov_name)
																									return -1;
																								if (a.gov_name > b.gov_name)
																									return 1;
																								return 0;
																					        });	

																				
																	}).fail( function() {                      
																		
																			$('#show').html('   Sorry! We could not load the timetable at the moment');
																			});
										
											
											
										
										
		
								});
								
								
		$("#all").click( function(e) {
			
						e.preventDefault(); 
	                   
					   var loc = this.text.toUpperCase();
						
						clear_append(loc);
						
					    for (var i = 0; i < governances.length; i++) { 
						
						 $("dl").append(governances[i].print_info());
						
						}
					   
					   $('dd').filter(':nth-child(n+4)').addClass('hide');
											$('dl').on('click', 'dt', function() {
																					   $(this)
																						.next()
																						.slideDown(500)
																						.siblings('dd')
																						.slideUp(500);
														});
					   
						});
						
	$("#map").click( function(e) {
			
						 e.preventDefault(); 
						
						var loc = this.text.toUpperCase();
						
						clear_append(loc);
						
						$('#show').load('map.html #target', function(){
						

										$("#show").find("#iraqmap").each(function() {
                                                  												      												
													   pageLoad();
                                                   });          
									 
                                         
										 var gov_card ="";
										
										 for (var i = 0; i < governances.length; i++) {
				                            
											gov_card +='<div  style="Z-INDEX: 1" id="'+governances[i].gov_name+'"><table class="govtab"><tr><th bgcolor="' + governances[i].color1 + '"><p style="text-align: center"><font size="4">'+governances[i].gov_name+' Governorate</font></th></tr><tr><td bgColor="' + governances[i].color2 + '"><p><b>Polling Stations Processed ( ' + governances[i].pol_st_pr + ' )</b></p><p><b>Total Valid Votes ( ' + governances[i].tot_val_vot + ' )</b></p><p><b>Total Invalid Votes ( ' + governances[i].tot_invalid_vot + ' )</b></p><p><b>Total Blank  ( ' + governances[i].tot_blank + ' )</b></p><p><b>Total Votes ( ' + governances[i].tot_votes + ' )</b></p><p><b>Registered Voters ( ' + governances[i].regis_voters + ' )</b></p></td></tr></table></div>';
										   
										   }
										 
										 
										 
										 $("#show").find("#cards").append(gov_card);
  
                                                      
						});
						
						
						
						});
						
						
		$("#gov").click( function(e) {
			
						 e.preventDefault(); 
						
						//var loc = this.text.toUpperCase();
						
						clear_append("By Governorate");
						
						var   div_obj  =   $('<div></div>').attr('id', 'govdiv');	 
						var   form_obj =   $('<form ></<form >').attr('id', 'post_server').attr('class','gov');
						var   h2_obj =   $('<h2></h2>').attr('id', 'govh').text('Search By Governorate Name');
						var   p_obj =   $('<p></p>').attr('id', 'govp');
						var   input_obj =   $('<input></input>').attr('id', 'search').attr('type','text');
						var   sub_obj =  $('<input></input>').attr('id', 'sub1').attr('type','submit');
						
						form_obj.append(h2_obj);
						p_obj.append(input_obj);
						form_obj.append(p_obj);	
						form_obj.append(sub_obj);
						div_obj.append(form_obj);
						$('#show').append(div_obj);
						      
                        $("#post_server").on('submit',function(e) {
							
						e.preventDefault(); 
                        $("dl").empty();					
						
						var search_gov = $('#search').val().trim();
						var i =0;
						
						while (i < governances.length+1) {
                                          
									
									if (i == governances.length)
							  
							           {
								            $("dl").append('<h2 align="center">.......... Please Check The Spelling Of The Governorate ..........</h2>'); 
							           }
									
									else { if (governances[i].gov_name.toLowerCase() == search_gov.toLowerCase()) { 						  
						       
							                  $("dl").append(governances[i].print_info());
						                      break; 
									       }
						            } 
										  
                                    
									i++;
                        }
						
						
						});							  

						});
						
		$("#about").click( function(e) {
			
						 e.preventDefault(); 
						
						var loc = this.text.toUpperCase();
						
						clear_append(loc);
						
						$('#show').append('<h3>I am a highly motivated Microsoft Certified Professional with proven experience in relational database design, implementation, management and maintenance, software engineering, Web design, and network support. My specific experience with SQL Server database logs shipping, mirroring and analysis.</h3></p></div><br><br><br><br>');
						
		});
		
		
		$("#Contact").click( function(e) {
			
						 e.preventDefault(); 
						
						var loc = this.text.toUpperCase();
						
						clear_append(loc);
						
						
						
						$('html').removeClass('js');
						
						
						
						
		});
						
		function clear_append(loc){
			
			            $('html').addClass('js');
			            $('#show').empty();
						$("dl").empty();
						$('#title').empty();
                        $('#title').append(loc);
			
		}
		
		
		
		
		
		