<!DOCTYPE html>
<html lang="en" class="no-js">
<?php include 'header.php' ?>
	<body>
<script>
$(window).load(function(){
	$('.preload_bg').fadeOut();
	}
)
</script>
<style>
    .preload_bg{
	background:#fff;
	width:100%;
	height:100%;
	position:fixed;
	z-index:99;
	top:0;
	bottom:0;
	}
.loading_ani{
	width:128px;
	height:15px;
	background:url(img/ajax-loader.gif) no-repeat;
	position:fixed;
	margin-left:50%;
	margin-right:50%;
	left:-64px;
	margin-top:290px;
	}
#loading_logo{
	background: url(img/leaflogo.png) no-repeat;
	width: 89px;
	height: 100px;
	display: inline-block;
	margin-top: 10px;
	}
</style>
<div class="preload_bg"><div id="loading_logo" style="margin-left: 50%; margin-right: 50%; left: -55px; position: fixed; margin-top: 180px;"></div><div class="loading_ani"></div></div>
		<div class="container">
			<?php include 'sidebar.php' ?>
            <img src="img/back.png" style="width:100%">
			<!--<header>
				<h1>Be A Planet Hero<span>Make a little difference and save the world</span></h1>	
			</header> -->
            <ul class="grid cs-style-4" style="max-width:1600px;">
                <li>
					<figure>
						<div><img src="img/badges.png" alt="Badges"></div>
						<figcaption>
							<h3>Badges</h3>
							<span>Your collection of badges!</span>
							<a href="badges.php">Take a look</a>
						</figcaption>
					</figure>
				</li>
                <li>
					<figure>
						<div><img src="img/hall.png" alt="Hall of fame"></div>
						<figcaption>
							<h3>Hall of Fame</h3>
							<span>Best in the league!</span>
							<a href="hall.php">Take a look</a>
						</figcaption>
					</figure>
				</li>
                <li>
					<figure>
						<div><img src="img/calendar.png" alt="Badges"></div>
						<figcaption>
							<h3>Calendar</h3>
							<span>Time to save the planet!</span>
							<a href="calendar.php">Take a look</a>
						</figcaption>
					</figure>
				</li>
            </ul>
		</div><!-- /container -->
	</body>
</html>