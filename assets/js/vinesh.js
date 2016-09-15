function StartUp(){
    var web = this,
        display = $('#container'),
        manager, screens = [],
        total = 0;
    
    this.init = function(){
        //register and activate header and footer
        this.registerscreens();
        manager = new WebManager(web, display, screens); 
        manager.init();
    };
    
    this.registerscreens = function(){
        $('#sections .section', display).each(function(i) {
            switch ($(this).attr('id').replace('a-', '')) {
                case 'home':
                    screens['home'] = {
                        id: total,
                        display: $(this),
                        screen: new HomeScreenManager(web, manager, $(this))
                    };
                    total++;
                    break;
                    
                case 'about':
                    screens['about'] = {
                        id: total,
                        display: $(this),
                        //screen: new Aboutscreen(web, manager, $(this))
                    };
                    total++;
                    break;
                    
                case 'skills':
                    screens['skills'] = {
                        id: total,
                        display: $(this),
                        //screen: new Skillsscreen(web, manager, $(this))
                    };
                    total++;
                    break;
                    
                case 'portfolio':
                    screens['portfolio'] = {
                        id: total,
                        display: $(this),
                        //screen: new Portfolioscreen(web, manager, $(this))
                    };
                    total++;
                    break;
                    
                case 'contact':
                    screens['contact'] = {
                        id: total,
                        display: $(this),
                        //screen: new Contactscreen(web, manager, $(this))
                    };
                    total++;
                    break;
                
                default:
                    break;
            }
        });
    };
    this.init();
}





function WebManager(web, display, screens){ // entire web, entire container, all screens[]
    var that = this,
        currentScreen = null;
    
    this.init = function(){
        this.monitorDimensions(); // maybe i can take this out as the container will be updated in the deep linking
        
        //init all screens
        screens['home'].screen.init();
        
        this.begin();
    }
    
    this.begin = function(){
        
        
        //deep linking method called(which will choose the page to be displayed)
        currentScreen = screens['home']; //this was called from the deeplinking
        $(window).trigger('resize'); // after deeplinking resize is called
        //all this should be done within the deep linking method
        
        
        
        this.viewScreen();
    };
    
    //view current screen #future update
    this.viewScreen = function(){
        currentScreen.screen.beginDisplay();
    }
    
    this.monitorDimensions = function(){
        $(window).bind('resize',function() {
            that.updateDimensions();
        });
        $(window).trigger('resize');
    };
    
    this.updateDimensions = function(){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        
        var calcHeight = windowHeight - ((windowWidth/100)*4);
        display.css({"width": "96%", "height": calcHeight+="px", "margin":"2%"});
        
        if(currentScreen != null){
            currentScreen.screen.updateStatementDimensions(windowWidth, windowHeight);
        }
    };
}





function HomeScreenManager(web, manager, display){ //web: entire web, manager: webManager, display: entire home screen only
    var that = this,
        statements,
        currentStatment = 0;
    
    this.init = function(){
        statements = new HomeStatements($('#home-st', display), display, that);
        statements.init();
        
        //need to add listeners to this statements and also place them within an array
    };
    
    this.beginDisplay = function(){
        
        
        //need a function to determine when slide to transition
        this.statementTimer();
        this.viewStatement();
        
        
        
        //calls a method to handle screen transitions
        //beingDisplay handles the timing and animation
        //this is where all the animations will start
        //bacground picture will be altered
        //check if the loading status for the screen is complete
        //enable the status for the homescreen
        //update screen dimensions
        
        //monitor statement change
    };
    
    this.statementTimer = function(){
        //will time how long a statement has been active for
        //force a de-animate
        //force a transition
        //force a re-animate for next slide
    };
    
    this.viewStatement = function(){
        statements.drawStatement(currentStatment);
    };
    
    this.updateStatementDimensions = function(windowWidth, windowHeight){
        var homeSt = $('#home-st', display);
        homeSt.css({"height": "45%", "bottem": "30%", "top": "25%"});
        if(windowWidth <= 960){
            homeSt.css({"width": "90%", "left": "5%", "right":"5%"});
        }else if(windowWidth > 950){
            homeSt.css({"width": "800px", "left": "auto", "right":"5%"});
        }else{
            homeSt.css({"width": "60%", "left": "35%", "right":"5%"});
        }
        
        //if the home screen is currently being displayed
        statements.updateDimensions(windowWidth, windowHeight); // this updated the size of the st-home container and also the desc and all span and dic elements contained within it
      //########################################
    };
    
    // need to place carsouel arrows here 
}





function HomeStatements(display, screen, manager){ // display: home-st, screen: home-section, manager: homeScreenManager,
    var statements = {
            statement: [],
            current: 0
        },
        currentStatemment,
        that = this;
    
    this.init = function(){
        this.compileStatements();
        this.setStatements();
        this.addStatementListeners();
        this.setStatementDisplayAttr();
    };
    
    this.drawStatement = function(current){
        //statements.current = current;
        //currentStatemment = statements.statement[current]; //maybe you can take this out as it shouldnt handle setting the current statement instead the method for switching statements should
        currentStatemment.container.show();
    };
    
    //obtains and places all text into array
    this.compileStatements = function(){
        var item = null;
        
        for(var i = 0; i < $('.statement-background', display).length; i++){
            item = $('.statement-background:eq('+i+')', display);
            statements.statement.push({
                id: i,
                container: $(item),
                color: null,
                title: $('.statement .st-title', item).text().split(''),
                description: $('.statement .st-desc', item).text().split(' ')
            });
        }
        
        $('.st-title', display).text('');
        $('.st-desc', display).text('');
        $('.find-out-more', display).text('');
    };
    
    //uses formed array to allocate divs with ids
    this.setStatements = function(){
        var item = null;
        
        for(var i = 0; i < statements.statement.length; i++){
            var statementContainer = statements.statement[i].container;//statement-background
            var statement = $('.statement',statementContainer);//statement
            //^MAY NEED TO REMOVE THIS AS THERE MAYBE NEED FOR IT
            
            var title = "<div class=\"titleWord\">";
            for(var u = 0 ; u < statements.statement[i].title.length ; u++){
                if(statements.statement[i].title[u] == " "){
                    title += "</div><div class=\"titleWord\">";
                }else{
                    title += "<div class=\"titleDiv\">"+statements.statement[i].title[u]+"</div>\n";
                }
            }
            title += "</div>"
            $('.st-title', statement).append(title);
            
            
            var description = "";
            for(var u = 0 ; u < statements.statement[i].description.length ; u++){
                description = description + "<div class=\"descriptionDiv\">"+statements.statement[i].description[u]+"</div>\n";
            }
            $('.st-desc', statement).append(description);
        }
        currentStatemment = statements.statement[0];
    };

    this.addStatementListeners = function() {
        $('.st-title .titleWord .titleDiv', currentStatemment.container).bind('mouseenter',function(){
            that.letterOver($(this));
        });
        
        $('.st-desc .descriptionDiv', currentStatemment.container).bind('mouseenter',function(){
            that.wordOver($(this));
        });
    };    
        
        
    this.letterOver = function(titleDiv){
        console.log(titleDiv.text());
        
        //check if it has already been animated
            //if already animated then do nothing
            //if not animated then animate it
    };
    
    this.wordOver = function(descriptionDiv){
        console.log(descriptionDiv.text());
    };
    
    this.updateDimensions = function(windowWidth, windowHeight){
        if(windowWidth <= 960){
            var difference = 960-windowWidth;
            var modulus = difference % 8;
            var fontSize = 150 - ((difference-modulus)/8);
            $('.titleDiv',display).css("font-size",fontSize);
            $('.descriptionDiv',display).css("font-size",fontSize/4);
        }else{
            var difference = windowWidth - 960;
            var modulus = difference % 8;
            var fontSize = 150 + ((difference-modulus)/30);
            $('.titleDiv',display).css("font-size",fontSize);
            $('.descriptionDiv',display).css("font-size",fontSize/4);
        }
    };
    
    this.setStatementDisplayAttr = function(){
        for(var i = 0; i < $('.statement-background', display).length; i++){
            item = $('.statement-background:eq('+i+')', display);
            item.hide();
        }  
    };
    
    this.revealStatement = function(){
        
    };
    
    this.revealDescription = function(){
        
    };
    
    this.hideStatement = function(){
        
    };
    
    this.hideDescription = function(){
        
    };
}
    
    
    
    
    
//    this.animate = function(){ // must add parameters here such as (location, size, job etc)
//    var ctx = document.querySelector("canvas").getContext("2d"),
//		    dashLen = 1500, 
//		    dashOffset = dashLen,
//		    speed = 9,
//		    txt = "hi,imvinesh",
//		    x = 100, //x position
//		    y = 400, //y position
//		    i = 0;
//
//			ctx.font = "300px talldark";
//			ctx.lineWidth = 1;
//			ctx.lineJoin = "round";
//			ctx.strokeStyle = ctx.fillStyle = "#000000";
//
//			var undo = false;
//			
//			(function loop() {
//				if (undo == false){
//					ctx.clearRect(x, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
//				
//			    	ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);
//
//			    	dashOffset -= speed; 
//			    	ctx.strokeText(txt, x, y);
//			    	if (dashOffset > 0){ 
//			    		requestAnimationFrame(loop);
//			    	} else {
//			    		undo = true;
//			    		requestAnimationFrame(loop);
//			    	}
//			 	} else {
//			 		ctx.clearRect(x, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
//				
//			    	ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);
//
//			    	dashOffset += speed; 
//			    	ctx.strokeText(txt, x, y);
//			    	if (dashOffset < 1501){ 
//			    		//requestAnimationFrame(loop);
//			    	} else {
//			    		undo = false;
//			    		//requestAnimationFrame(loop);
//			    	}
//			 	}
//			    
//			    //if(dashOffset < 1 ) {
//			    //    ctx.fillText(txt, x, y); // fill final letter
//			    //}
//			})();
//    }

//div for each flip ------
//set its class  ------ 
//set inline and set in center -------
//
//set the size depending on container size (can use the class you have set for this)
//may need to resize the container depending on the title size
//init
//    register transitions (if you want to)
//    read phrases and combine words
//    create phrases
//    compile any images (you can use retina here) also bring in bullet point images
//    bullet point hover listeners
//    bullet point select listeners
//    
//    set current home screen phrases and images etc
//    open statement (animation will need to be place when the statement opens)
//    close statements (animation will need to be placed when the statement closes)
//    
//    learn more button
//    revealstatement or character
//    revealdescription or word
//    statement listener
//    description listener
//    statement display
//    description display
//    
//    start letter randomizer
//    stop letter randomizer
//    randomizer for animating random letters
