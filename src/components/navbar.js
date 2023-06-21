

function Navbar() {

    return (

        <div className="navbar">
            <span className="logoNavbar">React Chat-App</span>
            <div className="user">
                <img src="https://media.istockphoto.com/id/1158014305/photo/headshot-of-a-teenage-boy.jpg?b=1&s=612x612&w=0&k=20&c=l065CBaRepJIyaOO6dOnCtPoAJ0OOV7oScXXO0FAcys=" />
                <span>Shubham</span>
                <button>Log Out</button>

            </div>
        </div>
    )
}

export default Navbar;