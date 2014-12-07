<!DOCTYPE html>
<html lang="en" class="no-js">
	<?php include 'header.php' ?>
	<body>
		<div class="container demo-3">
            <?php include 'sidebar.php' ?>
			<!-- Top Navigation -->
			<header style="padding-top:7em; background:#FFD700;">
				<h1>Hall of Fame</h1>	
				<nav class="codrops-demos">
				</nav>
			</header>
            <div class="listcontainer">
			<div id="users">
                <input class="search" placeholder="Search" />
                <!--<button class="sort" data-sort="name">
                    Sort by name
                </button>-->
                <ul class="list">
                <li>
                    <h3 class="name">Jonny Stromberg</h3>
                    <p class="born">1986</p>
                </li>
                <li>
                    <h3 class="name">Jonas Arnklint</h3>
                    <p class="born">1985</p>
                </li>
                <li>
                    <h3 class="name">Martina Elm</h3>
                    <p class="born">1986</p>
                </li>
                <li>
                    <h3 class="name">Gustaf Lindqvist</h3>
                    <p class="born">1983</p>
                </li>
                </ul>

            </div>
            </div>
            <script src="http://listjs.com/no-cdn/list.js"></script>
		</div><!-- /container -->
	</body>
    
<script>
var options = {
  valueNames: [ 'name', 'born' ]
};

var userList = new List('users', options);
    </script>
    
<style>
.listcontainer {
    width:45%;
    margin: 50px auto 0 auto;
    color: #323232;
}
.list {
  font-family:sans-serif;
  margin:0;
  padding:20px 0 0;
}
.list > li {
  display:block;
  background-color: #eee;
  padding:10px;
  box-shadow: inset 0 1px 0 #fff;
}
.avatar {
  max-width: 150px;
}
img {
  max-width: 100%;
}
h3 {
  font-size: 16px;
  margin:0 0 0.3rem;
  font-weight: normal;
  font-weight:bold;
}
p {
  margin:0;
}

input {
  border:solid 1px #ccc;
  border-radius: 5px;
  padding:7px 14px;
  margin-bottom:10px
}
input:focus {
  outline:none;
  border-color:#aaa;
}
.sort {
  padding:8px 30px;
  border-radius: 6px;
  border:none;
  display:inline-block;
  color:#fff;
  text-decoration: none;
  background-color: #28a8e0;
  height:30px;
}
.sort:hover {
  text-decoration: none;
  background-color:#1b8aba;
}
.sort:focus {
  outline:none;
}
.sort:after {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  content:"";
  position: relative;
  top:-10px;
  right:-5px;
}
.sort.asc:after {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
  content:"";
  position: relative;
  top:13px;
  right:-5px;
}
.sort.desc:after {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #fff;
  content:"";
  position: relative;
  top:-10px;
  right:-5px;
}
    </style>
</html>