            <ul id="gn-menu" class="gn-menu-main">
				<li class="gn-trigger">
					<a class="gn-icon gn-icon-menu"><span>Menu</span></a>
					<nav class="gn-menu-wrapper">
						<div class="gn-scroller">
							<ul class="gn-menu">
								<li><a href="index.php"><span class="list_item">Home</span></a></li>
								<li>
									<a href="cave.php"><span class="list_item">My Secret Cave</span></a>
									<ul class="gn-submenu">
										<li><a href="badges.php"><span class="list_subitem">Badges</span></a></li>
                                        <!-- For reference -->
										<!--<li><a class="gn-icon gn-icon-photoshop">Photoshop files</a></li>-->
									</ul>
								</li>
								<li><a href="hall.php"><span class="list_item">Hall of Fame</span></a></li>
                                <!-- Cutting the Events page, events should be found in Calendar
                                <li><a href="events.php"><span class="list_item">Events</span></a></li>-->
                                <li><a href="calendar.php"><span class="list_item">Calendar</span></a></li>
                                <!-- For reference -->
								<!--<li><a class="gn-icon gn-icon-help" href="calendar.php">Calendar</a></li>-->
                                <li><a><span class="list_item">Help</span></a></li>
								<!--<li>
									<a class="gn-icon gn-icon-archive">Archives</a>
									<ul class="gn-submenu">
										<li><a class="gn-icon gn-icon-article">Articles</a></li>
										<li><a class="gn-icon gn-icon-pictures">Images</a></li>
										<li><a class="gn-icon gn-icon-videos">Videos</a></li>
									</ul>
								</li>-->
							</ul>
						</div><!-- /gn-scroller -->
					</nav>
				</li>
				<li><a href="index.php"><img src="img/leaflogo.png" style="width:22px;vertical-align:middle;margin:-4px 5px 0 auto;">Planet Hero</a></li>
				<li><a class="codrops-icon codrops-icon-drop" href="http://tympanus.net/codrops/?p=16030"><span>Sign In</span></a></li>
			</ul>
        <style> .list_item{margin-left:60px;}.list_subitem{margin-left:80px;}</style>
        <script src="Badges/js/toucheffects.js"></script>
        <script src="js/classie.js"></script>
		<script src="js/gnmenu.js"></script>
		<script>
			new gnMenu( document.getElementById( 'gn-menu' ) );
		</script>