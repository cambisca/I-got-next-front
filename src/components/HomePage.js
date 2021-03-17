import React from 'react'

function Homepage(){
    return (
        <div class="home-wrapper">
            <div class="nav">
                <div class="option opt-logo">
                    I GOT NEXT
                </div>
                <div class="option opt-discover">
                    Discover
                </div>
                <div class="option opt-login">
                    Login
                </div>
            </div>
            <div class="background-video">
                <video autoplay muted allowfullscreen id="home-video">
                    {/* <source src="https://www.youtube.com/embed/GGPH_qf4awk"></source> */}
                    <iframe src="https://www.youtube.com/embed/GGPH_qf4awk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </video>
            </div>
        </div>
    )
}

export default Homepage;