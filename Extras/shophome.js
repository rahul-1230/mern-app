<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>

    <!--<title> Responsiive Admin | CodingLab </title>-->
    <link rel="stylesheet" href="style.css">
    <!-- Boxicons CDN Link -->
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>

    <style>

/* Googlefont Poppins CDN Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.sidebar{
  position: fixed;
  height: 100%;
  width: 240px;
  background: #0A2558;
  transition: all 0.5s ease;
}
.sidebar.active{
  width: 60px;
}
.sidebar .logo-details{
  height: 80px;
  display: flex;
  align-items: center;
}
.sidebar .logo-details i{
  font-size: 28px;
  font-weight: 500;
  color: #fff;
  min-width: 60px;
  text-align: center
}
.sidebar .logo-details .logo_name{
  color: #fff;
  font-size: 24px;
  font-weight: 500;
}
.sidebar .nav-links{
  margin-top: 10px;
}
.sidebar .nav-links li{
  position: relative;
  list-style: none;
  height: 50px;
}
.sidebar .nav-links li a{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}
.sidebar .nav-links li a.active{
  background: #081D45;
}
.sidebar .nav-links li a:hover{
  background: #081D45;
}
.sidebar .nav-links li i{
  min-width: 60px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.sidebar .nav-links li a .links_name{
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
}
.sidebar .nav-links .log_out{
  position: absolute;
  bottom: 0;
  width: 100%;
}
.home-section{
  position: relative;
  background: #c6ffee;
  min-height: 100vh;
  width: calc(100% - 240px);
  left: 240px;
  transition: all 0.5s ease;
}
.sidebar.active ~ .home-section{
  width: calc(100% - 60px);
  left: 60px;
}
.home-section nav{
  display: flex;
  justify-content: space-between;
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  width: calc(100% - 240px);
  left: 240px;
  z-index: 100;
  padding: 0 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}
.sidebar.active ~ .home-section nav{
  left: 60px;
  width: calc(100% - 60px);
}
.home-section nav .sidebar-button{
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
}
nav .sidebar-button i{
  font-size: 35px;
  margin-right: 10px;
}
.home-section nav .search-box{
  position: relative;
  height: 50px;
  max-width: 550px;
  width: 100%;
  margin: 0 20px;
}
nav .search-box input{
  height: 100%;
  width: 100%;
  outline: none;
  background: #F5F6FA;
  border: 2px solid #EFEEF1;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
}
nav .search-box .bx-search{
  position: absolute;
  height: 40px;
  width: 40px;
  background: #2697FF;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 22px;
  transition: all 0.4 ease;
}
.home-section nav .profile-details{
  display: flex;
  align-items: center;
  background: #F5F6FA;
  border: 2px solid #EFEEF1;
  border-radius: 6px;
  height: 50px;
  width: 100px;
  padding: 0 15px 0 2px;
}
.home-section nav .profile-details:hover{
    background-color: #006eff; 
}
.home-section nav .profile-details:hover a{
    color : white;
}
.home-section nav .profile-details a{
    text-decoration: none;
}
nav .profile-details img{
  height: 40px;
  width: 40px;
  border-radius: 6px;
  object-fit: cover;
}
nav .profile-details .admin_name{
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 10px;
  white-space: nowrap;
}
nav .profile-details i{
  font-size: 25px;
  color: #333;
}
.home-section .home-content{
  position: relative;
  top: 90px; 
}

/* CSS */
.btn-info {
  align-items: center;
  background-color: #0A66C2;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
}

.btn-info:hover,
.btn-info:focus { 
  background-color: #16437E;
  color: #ffffff;
}

.btn-info:active {
  background: #09223b;
  color: rgb(255, 255, 255, .7);
}

.btn-info:disabled { 
  cursor: not-allowed;
  background: rgba(0, 0, 0, .08);
  color: rgba(0, 0, 0, .3);
}
/* Responsive Media Query */
@media (max-width: 1240px) {
  .sidebar{
    width: 60px;
  }
  .sidebar.active{
    width: 220px;
  }
  .home-section{
    width: calc(100% - 60px);
    left: 60px;
  }
  .sidebar.active ~ .home-section{
    /* width: calc(100% - 220px); */
    overflow: hidden;
    left: 220px;
  }
  .home-section nav{
    width: calc(100% - 60px);
    left: 60px;
  }
  .sidebar.active ~ .home-section nav{
    width: calc(100% - 220px);
    left: 220px;
  }
}

@media (max-width: 700px) {
  nav .sidebar-button .role,
  nav .profile-details .admin_name,
  nav .profile-details i{
    display: none;
  }
  .home-section nav .profile-details{
    height: 50px;
    min-width: 40px;
  }
}
@media (max-width: 550px) {
  .sidebar.active ~ .home-section nav .profile-details{
    display: none;
  }
}

.home-content{
  padding: 0 20px;
  top: 80px;
}
.home-content .home-header{
  position: sticky;
  padding: 10px 0px;
}
.home-content .home-heading{
  width: calc(100% - 160);
  text-align: center;
  text-shadow: #2697FF;
  display: inline-block;
}
.home-content .home-header .top-heading{
  display: flex;
  justify-content: space-between;
}

.home-content .filters{
  display: flex;
  width: 100%;
  padding: 5px 0;
  justify-content: space-between;
}
.filters >div{
  height: 40px;
  margin: 5px 0px;
}
.filters .inputstlDropDown{
  height: 40px;
  border-radius: 5px;
  background-color: #a8d4ff;
}
/* .frame-image:hover + .operations{
  visibility: visible;
}
.frames-container{
  overflow: auto;
 width: 100%;
  height: 100%; 
  display: flex;
  flex-wrap: wrap;
  top: 120px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
}
.frame{
  margin-bottom: 2rem;
}
.frame .frame-image{
  border: black solid;
}
.frame-images{
  margin: 5px 0;
  border-radius: 20px;
}
.operations{
  visibility: hidden;
  background: #09223b;
} */
.frame-image {
      border: 2px solid #EEE;
      margin: 1rem;
      width: 300px;
      height: 300px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .frame-image:hover {
      box-shadow: 10px 10px 20px rgb(71, 68, 68);
    }

    .frame-image img {
      width: 250px;
      height: 250px;
      text-align: center;
      padding-left: 3rem;
    }

    .frame-info {
      font-size: 0.8rem;
      padding-left: 1rem;
      padding-bottom: 1rem;
      display: flex;
      justify-content: space-between;
    }

    .action-btn {
      display: flex;
      flex-direction: column;
      padding-right: 1rem
    }

    .action-btn button {
      margin-bottom: 1rem;
      width: 4rem;
      height: 1.5rem;
      background-color: #00ADB5;
      border: none;
      color: white;
      font-size: 0.8rem;
    }

    .action-btn button:hover {
      outline-style: solid;
      outline: 2px solid #EEE;
      cursor: pointer;
    }

    .frame-image:hover+.operations {
      visibility: visible;
    }
    .frames{

      overflow: auto;
    }
    .frames-container {
      overflow: auto;
      /* width: 100%;
  height: 100%; */
      display: flex;
      flex-wrap: wrap;
      top: 120px;
      margin-top: 10px;
      margin-bottom: 10px;
      justify-content: space-evenly;
    }

    .frame-images {
      margin: 5px 0;
      border-radius: 20px;
    }

    .operations {
      visibility: hidden;
      background: #09223b;
    }
    </style>
</head>
<body>

  <div class="sidebar">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">LensePro</span>
    </div>
    <ul class="nav-links">
      <li>
        <a href="" class="active">
          <i class='bx bx-grid-alt' ></i>
          <span class="links_name" >Frames</span>
        </a>
      </li>
      <li>
        <a href="/shop/<%= shopid %>/addCustPage" >
          <i class='bx bx-box' ></i>
          <span class="links_name">Add Customer</span>
        </a>
      </li>
      <li>
        <a href="/shop/<%= shopid %>/viewCusts">
          <i class='bx bx-list-ul' ></i>
          <span class="links_name">View All Customers</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-pie-chart-alt-2' ></i>
          <span class="links_name">Reports</span>
        </a>
      </li>
      
      <li>
        <a href="#">
          <i class='bx bx-book-alt' ></i>
          <span class="links_name">Messages</span>
        </a>
      </li>
      <li class="log_out">
        <a href="/adminlogout">
          <i class='bx bx-log-out'></i>
          <span class="links_name">Log out</span>
        </a>
      </li>
    </ul>
  </div>
  <section class="home-section">
    <div class="navbar">
      <nav>
        <div class="sidebar-button">
          <i class='bx bx-menu sidebarBtn'></i>
          <span class="role"><%= shop.name %></span>
        </div>

        <div class="profile-details">
          <!--<img src="images/profile.jpg" alt="">-->
          <span class="shop_name"><a href="/shop/profile/<%= shopid %>">Profile</a></span>
          <i class='bx bx-user' ></i>
        </div>
      </nav>
    </div>

    <div class="home-content">
      <div class="home-header">
        <div class="top-heading">
        <div class="home-heading">
          <h1>Frames</h1>
        </div><!-- end   home-heading -->
        </div><!-- end   top-heading-->
        <div class="filters">
          <div class="brand" >
            <select class="form-control inputstlDropDown" name="brand" id="brand">
              <option selected value="any">Brand</option>
            </select>
          </div><!-- end   brand-->
          <div class="color" >
            <select class="form-control inputstlDropDown" name="color" id="color">
              <div class="dropdownMenu">
              <option selected value="any" >Color</option>
              <option >Black</option>
              <option >Brown</option>
              <option >Blue</option>
              <option >Grey</option>
              <option >Gold</option>
              <option >Red</option>
              <option >Silver</option>
              <option >Tortoise</option>
              <option >Gunmetal</option>
              <option >Green</option>
              <option >Purple</option>
              <option >Pink</option>
              <option >White</option>
              <option >Golden</option>
              <option >Maroon</option>
              <option >Rose Brown</option>
              <option >Transparent</option>
            </div>
            </select>
          </div><!-- end   color-->
          <div class="size">
            <select class="form-control inputstlDropDown" name="size" id="size">
              <option selected value="any" >Size</option>
              <option>Extra Narrow</option>
              <option>Narrow</option>
              <option>Medium</option>
              <option>Wide</option>
              <option>Extra Wide</option>
            </select>
          </div><!-- end   size-->
          <div class="material">
            <select class="form-control inputstlDropDown" name="material" id="material">
              <option selected value="any" >Material</option>
              <option>Metal</option>
              <option>Plastic</option>
            </select>
          </div><!-- end   material-->
        </div><!-- end   filters-->
      </div><!-- end   home-header-->
        <div class="frames">

          <%
          if(frameData.length!=0 ){
          %>
          <div class="frames-container">
          <%
            var i = 0;
            frameData.forEach(function(frames){
          %>
              <div class="frame">
                <div class="frame-image">
                  <img src="data:image/<%=frames.photo.contentType%>;base64,
                  <%=frames.photo.data.toString('base64')%>" width=250 height=250 style="margin: 5px;">
                  <div class="frame-info">
                    <div class="info">
                      <p style="font-size: 125%;"><i><b><%= frames.name %></b></i></p>
                      <p><b>Brand :</b> <%= frames.brand %></p>
                      <p><b>Price :</b> <%= frames.price %> Rs.</p>
                    </div>
                    <div class="action-btn">
                      <form action="/admin/<%= frames.id %>/editPage" ><button>Edit</button></form>
                      <form action="/admin/<%= frames.id %>/delete" ><button onclick="return confirm('Are you sure you want to delete this frame?')" >Delete</button></form>
                    </div>
                  </div>
                </div>
                <div class="operations">
                  <a href="/admin/viewFrameDetails"><i class="fas fa-eye"></i></a>
                  <a href="/admin/updateFrameDetails"><i class="fas fa-edit"></i></a>
                  <a href="/admin/deleteFrame"><i class="fa fa-remove"></i></a>
                </div>
              </div>
            </div>
          <% }) %>
        </div>
          <% } else{ %>
              <h1>No Frame Found!</h1>
          <% } %>
          
        </div><!-- end   frames-->  
    </div><!-- end   home-content-->

 
  </section>

  <script>

if(req.query.msg){
  alert(req.query.msg);
}    
   let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}
 </script>

</body>
</html>
