import React from 'react'

function About() {
    return (
        <div className='container-fluid mt-3'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card h-100">
                        <img src="https://image.freepik.com/free-vector/corporate-website-abstract-concept-illustration_335657-1831.jpg" className="card-img-top" style={{width: '50%'}} alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title pacifico-regular">About</h5>
                            <p className="card-text playwrite-sk">KnowledgeBridge is an advanced e-learning platform designed to enhance your learning experience.
                                Our mission is to bridge the gap between knowledge seekers and providers by offering comprehensive
                                and interactive online courses. Whether you are a student looking to learn new skills or a mentor
                                willing to share your expertise, KnowledgeBridge is the perfect place for you.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="https://i.pinimg.com/originals/56/62/3f/56623f8c21016aab03e1da14ed6a6b64.png" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title pacifico-regular">Our Mission</h5>
                            <p className="card-text playwrite-sk"> To empower individuals through accessible, high-quality education and to create a global community
                                of learners and educators.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="https://static.vecteezy.com/system/resources/previews/001/879/618/non_2x/brainstorming-to-solve-problem-startup-office-with-swing-modern-workplace-or-coworking-space-play-and-work-flat-illustration-for-landing-page-web-website-banner-mobile-flyer-poster-free-vector.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title pacifico-regular">Why Choose Us?</h5>
                            <p className="card-text playwrite-sk">  Wide range of courses <br />
                                Expert mentors <br />
                                User-friendly interface <br />
                                Interactive learning experience <br />
                                Flexible learning schedule</p>
                        </div>
                    </div>
                </div><br /><br />
               

            </div> 
            <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '78vh',
  padding: '10px', // Increase padding for better spacing
  boxSizing: 'border-box' // Ensure padding does not affect the width
}}>
  <div className='row-md-12' style={{ width: '100%', maxWidth: '500px' }}>
    <div className="card" style={{ width: '100%',  textAlign: 'center' }}>
      <div className="card-header pacifico-regular">
        Contact Details
      </div>
      <div className="card-body playwrite-sk">
        <img src="https://static.vecteezy.com/system/resources/previews/009/583/351/original/3d-illustration-contact-options-png.png" style={{ width: '40%', maxWidth: '200px' }} className="card-img-top" alt="..." />
        <div className="card-text">
          <ul className="list-unstyled">
            <li>Phone: +1 234 567 890</li>
            <li>Email: info@knowledgebridge.com</li>
            <li>Address: 123 Learning Lane, EduCity</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>


        </div>
    )
}

export default About;
