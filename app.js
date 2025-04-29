// DevProfile - Professional Job Card Creator
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pagesSections = document.querySelectorAll('.page-section');
    const createProfileBtn = document.getElementById('createProfileBtn');
    const createFirstProfileBtn = document.getElementById('createFirstProfileBtn');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinksContainer = document.getElementById('navLinks');
    
    // Add a Preview button to the HTML
    const actions = document.querySelector('.actions');
    if (actions) {
        const previewBtn = document.createElement('button');
        previewBtn.classList.add('btn', 'btn-primary');
        previewBtn.id = 'previewBtn';
        previewBtn.textContent = 'Preview';
        actions.insertBefore(previewBtn, actions.querySelector('#saveBtn'));
    }
    
    // Form Elements
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    const addEducationBtn = document.getElementById('addEducationBtn');
    const resetBtn = document.getElementById('resetBtn');
    const saveBtn = document.getElementById('saveBtn');
    const previewBtn = document.getElementById('previewBtn');
    
    // Skills
    const skillName = document.getElementById('skillName');
    const skillLevel = document.getElementById('skillLevel');
    const skillsList = document.getElementById('skillsList');
    
    // Experience
    const jobPosition = document.getElementById('jobPosition');
    const company = document.getElementById('company');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const jobDescription = document.getElementById('jobDescription');
    const experienceList = document.getElementById('experienceList');
    
    // Education
    const degree = document.getElementById('degree');
    const school = document.getElementById('school');
    const eduStartDate = document.getElementById('eduStartDate');
    const eduEndDate = document.getElementById('eduEndDate');
    const eduDescription = document.getElementById('eduDescription');
    const educationList = document.getElementById('educationList');
    
    // Profile Picture
    const profilePicture = document.getElementById('profilePicture');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    
    // Preview Section
    const previewSection = document.getElementById('previewSection');
    const previewProfileImg = document.getElementById('previewProfileImg');
    const previewName = document.getElementById('previewName');
    const previewTitle = document.getElementById('previewTitle');
    const previewEmail = document.getElementById('previewEmail');
    const previewPhone = document.getElementById('previewPhone');
    const previewLocation = document.getElementById('previewLocation');
    const previewWebsite = document.getElementById('previewWebsite');
    const previewSummary = document.getElementById('previewSummary');
    const previewSkills = document.getElementById('previewSkills');
    const previewExperience = document.getElementById('previewExperience');
    const previewEducation = document.getElementById('previewEducation');
    
    // Cards Gallery
    const profileCardsGallery = document.getElementById('profileCardsGallery');
    const emptyState = document.getElementById('emptyState');
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    
    // Data Storage
    let skills = [];
    let experiences = [];
    let education = [];
    let profileData = {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        summary: '',
        profileImage: null
    };
    
    // Get saved profiles from localStorage
    let savedProfiles = JSON.parse(localStorage.getItem('devProfiles')) || [];
    
    // Navigation Functions
    function navigateToPage(pageName) {
        console.log('Navigating to page:', pageName);
        
        pagesSections.forEach(section => {
            section.classList.remove('active');
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`${pageName}Page`);
        const targetLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        
        if (targetPage) targetPage.classList.add('active');
        if (targetLink) targetLink.classList.add('active');
        
        // Close mobile menu if open
        navLinksContainer.classList.remove('active');
    }
    
    // Navigate to page when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);
        });
    });
    
    // Create profile button
    if (createProfileBtn) {
        createProfileBtn.addEventListener('click', function() {
            navigateToPage('profile');
        });
    }
    
    // Create first profile button
    if (createFirstProfileBtn) {
        createFirstProfileBtn.addEventListener('click', function() {
            navigateToPage('profile');
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
    
    // Tab Navigation
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
    
    // Preview Toggle
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            updatePreview();
            previewSection.style.display = previewSection.style.display === 'none' ? 'flex' : 'none';
            previewBtn.textContent = previewSection.style.display === 'none' ? 'Preview' : 'Hide Preview';
        });
    }
    
    // Contact Form Submission
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && subject && message) {
                alert(`Thank you ${name}! Your message has been sent successfully.`);
                document.getElementById('contactName').value = '';
                document.getElementById('contactEmail').value = '';
                document.getElementById('contactSubject').value = '';
                document.getElementById('contactMessage').value = '';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Profile Picture Handling
    if (profilePicture) {
        profilePicture.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileData.profileImage = e.target.result;
                    previewProfileImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Skills Functions
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            if (skillName.value.trim() === '') return;
            
            const skill = {
                name: skillName.value.trim(),
                level: parseInt(skillLevel.value)
            };
            
            skills.push(skill);
            renderSkills();
            updatePreview();
            
            skillName.value = '';
            skillLevel.value = '1';
        });
    }
    
    function renderSkills() {
        skillsList.innerHTML = '';
        
        skills.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'list-item';
            
            const levelText = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][skill.level - 1];
            
            skillItem.innerHTML = `
                <strong>${skill.name}</strong> - ${levelText}
                <button class="remove-btn" data-index="${index}" data-type="skill">&times;</button>
            `;
            
            skillsList.appendChild(skillItem);
        });
        
        addRemoveListeners();
    }
    
    // Experience Functions
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', function() {
            if (jobPosition.value.trim() === '' || company.value.trim() === '') return;
            
            const experience = {
                position: jobPosition.value.trim(),
                company: company.value.trim(),
                startDate: startDate.value,
                endDate: endDate.value,
                description: jobDescription.value.trim()
            };
            
            experiences.push(experience);
            renderExperiences();
            updatePreview();
            
            jobPosition.value = '';
            company.value = '';
            startDate.value = '';
            endDate.value = '';
            jobDescription.value = '';
        });
    }
    
    function renderExperiences() {
        experienceList.innerHTML = '';
        
        experiences.forEach((exp, index) => {
            const startDateFormatted = exp.startDate ? formatDate(exp.startDate) : '';
            const endDateFormatted = exp.endDate ? formatDate(exp.endDate) : 'Present';
            
            const expItem = document.createElement('div');
            expItem.className = 'list-item';
            
            expItem.innerHTML = `
                <strong>${exp.position}</strong> at ${exp.company}
                <div>${startDateFormatted} - ${endDateFormatted}</div>
                <p>${exp.description}</p>
                <button class="remove-btn" data-index="${index}" data-type="experience">&times;</button>
            `;
            
            experienceList.appendChild(expItem);
        });
        
        addRemoveListeners();
    }
    
    // Education Functions
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            if (degree.value.trim() === '' || school.value.trim() === '') return;
            
            const edu = {
                degree: degree.value.trim(),
                school: school.value.trim(),
                startDate: eduStartDate.value,
                endDate: eduEndDate.value,
                description: eduDescription.value.trim()
            };
            
            education.push(edu);
            renderEducation();
            updatePreview();
            
            degree.value = '';
            school.value = '';
            eduStartDate.value = '';
            eduEndDate.value = '';
            eduDescription.value = '';
        });
    }
    
    function renderEducation() {
        educationList.innerHTML = '';
        
        education.forEach((edu, index) => {
            const startDateFormatted = edu.startDate ? formatDate(edu.startDate) : '';
            const endDateFormatted = edu.endDate ? formatDate(edu.endDate) : 'Present';
            
            const eduItem = document.createElement('div');
            eduItem.className = 'list-item';
            
            eduItem.innerHTML = `
                <strong>${edu.degree}</strong> at ${edu.school}
                <div>${startDateFormatted} - ${endDateFormatted}</div>
                <p>${edu.description}</p>
                <button class="remove-btn" data-index="${index}" data-type="education">&times;</button>
            `;
            
            educationList.appendChild(eduItem);
        });
        
        addRemoveListeners();
    }
    
    // Add Remove Event Listeners
    function addRemoveListeners() {
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const index = parseInt(this.getAttribute('data-index'));
                const type = this.getAttribute('data-type');
                
                if (type === 'skill') {
                    skills.splice(index, 1);
                    renderSkills();
                } else if (type === 'experience') {
                    experiences.splice(index, 1);
                    renderExperiences();
                } else if (type === 'education') {
                    education.splice(index, 1);
                    renderEducation();
                }
                
                updatePreview();
            });
        });
    }
    
    // Save Profile Function
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Get values from form
            profileData.fullName = document.getElementById('fullName').value.trim();
            profileData.jobTitle = document.getElementById('jobTitle').value.trim();
            profileData.email = document.getElementById('email').value.trim();
            profileData.phone = document.getElementById('phone').value.trim();
            profileData.location = document.getElementById('location').value.trim();
            profileData.website = document.getElementById('website').value.trim();
            profileData.summary = document.getElementById('summary').value.trim();
            
            // Validate required fields
            if (!profileData.fullName || !profileData.jobTitle) {
                alert('Please fill in Name and Job Title');
                return;
            }
            
            // Create the complete profile
            const timestamp = new Date().getTime();
            const completeProfile = {
                id: timestamp,
                createdAt: timestamp,
                personalInfo: profileData,
                skills: skills,
                experiences: experiences,
                education: education
            };
            
            // Save to localStorage
            savedProfiles.push(completeProfile);
            localStorage.setItem('devProfiles', JSON.stringify(savedProfiles));
            
            // Show success message
            alert('Profile saved successfully!');
            
            // Update gallery
            renderProfileCards();
            
            // Show preview
            previewSection.style.display = 'flex';
            
            // Navigate to home
            navigateToPage('home');
        });
    }
    
    // Reset Form Function
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset the form? All unsaved data will be lost.')) {
                // Reset fields
                document.getElementById('fullName').value = '';
                document.getElementById('jobTitle').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('location').value = '';
                document.getElementById('website').value = '';
                document.getElementById('summary').value = '';
                fileNameDisplay.textContent = 'Choose a profile picture';
                
                // Reset data
                skills = [];
                experiences = [];
                education = [];
                profileData = {
                    fullName: '',
                    jobTitle: '',
                    email: '',
                    phone: '',
                    location: '',
                    website: '',
                    summary: '',
                    profileImage: null
                };
                
                // Clear lists
                skillsList.innerHTML = '';
                experienceList.innerHTML = '';
                educationList.innerHTML = '';
                
                // Hide preview
                previewSection.style.display = 'none';
                
                // Reset profile picture
                previewProfileImg.src = '/api/placeholder/150/150';
            }
        });
    }
    
    // Update Preview Section
    function updatePreview() {
        // Show preview section
        previewSection.style.display = 'flex';
        
        // Update personal info
        previewName.textContent = profileData.fullName || 'Your Name';
        previewTitle.textContent = profileData.jobTitle || 'Your Job Title';
        previewEmail.textContent = profileData.email || 'your.email@example.com';
        previewPhone.textContent = profileData.phone || 'Your Phone Number';
        previewLocation.textContent = profileData.location || 'Your Location';
        previewWebsite.textContent = profileData.website || 'your-website.com';
        previewSummary.textContent = profileData.summary || 'Your professional summary will appear here.';
        
        if (profileData.profileImage) {
            previewProfileImg.src = profileData.profileImage;
        }
        
        // Update skills
        previewSkills.innerHTML = '';
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill.name;
            previewSkills.appendChild(skillItem);
        });
        
        // Update experience
        previewExperience.innerHTML = '';
        experiences.forEach(exp => {
            const expItem = document.createElement('div');
            expItem.className = 'experience-item';
            
            const startDateFormatted = exp.startDate ? formatDate(exp.startDate) : '';
            const endDateFormatted = exp.endDate ? formatDate(exp.endDate) : 'Present';
            
            expItem.innerHTML = `
                <div class="item-header">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-date">${startDateFormatted} - ${endDateFormatted}</div>
                </div>
                <div class="item-subtitle">${exp.company}</div>
                <p>${exp.description}</p>
            `;
            
            previewExperience.appendChild(expItem);
        });
        
        // Update education
        previewEducation.innerHTML = '';
        education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            
            const startDateFormatted = edu.startDate ? formatDate(edu.startDate) : '';
            const endDateFormatted = edu.endDate ? formatDate(edu.endDate) : 'Present';
            
            eduItem.innerHTML = `
                <div class="item-header">
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-date">${startDateFormatted} - ${endDateFormatted}</div>
                </div>
                <div class="item-subtitle">${edu.school}</div>
                <p>${edu.description}</p>
            `;
            
            previewEducation.appendChild(eduItem);
        });
    }
    
    // Profile Cards Functions
    function renderProfileCards() {
        console.log('Rendering profile cards:', savedProfiles);
        
        if (savedProfiles.length > 0) {
            // Hide empty state
            emptyState.style.display = 'none';
            
            // Clear gallery
            profileCardsGallery.innerHTML = '';
            
            // Add cards
            savedProfiles.forEach(profile => {
                const card = document.createElement('div');
                card.classList.add('profile-card');
                card.setAttribute('data-id', profile.id);
                
                // Get skills
                const skillsHtml = profile.skills.slice(0, 3).map(skill => 
                    `<span class="skill-tag">${skill.name}</span>`
                ).join('');
                
                // Format date
                const date = new Date(profile.createdAt);
                const formattedDate = date.toLocaleDateString();
                
                // Create card HTML
                card.innerHTML = `
                    <div class="card-header">
                        <img src="${profile.personalInfo.profileImage || '/api/placeholder/150/150'}" alt="Profile" class="card-profile-img">
                        <div class="card-info">
                            <h3>${profile.personalInfo.fullName}</h3>
                            <p>${profile.personalInfo.jobTitle}</p>
                        </div>
                    </div>
                    <div class="card-skills">
                        ${skillsHtml}
                        ${profile.skills.length > 3 ? `<span class="more-skills">+${profile.skills.length - 3} more</span>` : ''}
                    </div>
                    <div class="card-footer">
                        <span class="card-date">Created: ${formattedDate}</span>
                        <div class="card-actions">
                            <button class="view-btn" data-id="${profile.id}">View</button>
                            <button class="edit-btn" data-id="${profile.id}">Edit</button>
                            <button class="delete-btn" data-id="${profile.id}">Delete</button>
                        </div>
                    </div>
                `;
                
                profileCardsGallery.appendChild(card);
            });
            
            // Add event listeners to card buttons
            addCardButtonListeners();
        } else {
            // Show empty state
            emptyState.style.display = 'block';
            profileCardsGallery.innerHTML = '';
        }
    }
    
    function addCardButtonListeners() {
        // View buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const profileId = this.getAttribute('data-id');
                viewProfile(profileId);
            });
        });
        
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const profileId = this.getAttribute('data-id');
                editProfile(profileId);
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const profileId = this.getAttribute('data-id');
                deleteProfile(profileId);
            });
        });
    }
    
    function viewProfile(profileId) {
        const profile = savedProfiles.find(p => p.id == profileId);
        if (profile) {
            // Load profile data
            profileData = { ...profile.personalInfo };
            skills = [...profile.skills];
            experiences = [...profile.experiences];
            education = [...profile.education];
            
            // Update preview
            updatePreview();
            
            // Navigate to profile page with preview visible
            navigateToPage('profile');
            previewSection.style.display = 'flex';
        }
    }
    
    function editProfile(profileId) {
        const profile = savedProfiles.find(p => p.id == profileId);
        const profileIndex = savedProfiles.findIndex(p => p.id == profileId);
        
        if (profile) {
            // Load profile data
            profileData = { ...profile.personalInfo };
            skills = [...profile.skills];
            experiences = [...profile.experiences];
            education = [...profile.education];
            
            // Populate form fields
            document.getElementById('fullName').value = profileData.fullName || '';
            document.getElementById('jobTitle').value = profileData.jobTitle || '';
            document.getElementById('email').value = profileData.email || '';
            document.getElementById('phone').value = profileData.phone || '';
            document.getElementById('location').value = profileData.location || '';
            document.getElementById('website').value = profileData.website || '';
            document.getElementById('summary').value = profileData.summary || '';
            
            if (profileData.profileImage) {
                previewProfileImg.src = profileData.profileImage;
            }
            
            // Render lists
            renderSkills();
            renderExperiences();
            renderEducation();
            
            // Update save button to update instead of create new
            saveBtn.textContent = 'Update Profile';
            const originalSaveFunction = saveBtn.onclick;
            
            saveBtn.onclick = function() {
                // Update existing profile
                const updatedProfile = {
                    ...profile,
                    personalInfo: {
                        fullName: document.getElementById('fullName').value.trim(),
                        jobTitle: document.getElementById('jobTitle').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        phone: document.getElementById('phone').value.trim(),
                        location: document.getElementById('location').value.trim(),
                        website: document.getElementById('website').value.trim(),
                        summary: document.getElementById('summary').value.trim(),
                        profileImage: profileData.profileImage
                    },
                    skills: skills,
                    experiences: experiences,
                    education: education,
                    updatedAt: new Date().getTime()
                };
                
                savedProfiles[profileIndex] = updatedProfile;
                localStorage.setItem('devProfiles', JSON.stringify(savedProfiles));
                
                alert('Profile updated successfully!');
                
                // Reset save button
                saveBtn.textContent = 'Save Profile';
                saveBtn.onclick = originalSaveFunction;
                
                // Update gallery
                renderProfileCards();
                
                // Navigate to home
                navigateToPage('home');
            };
            
            // Navigate to profile page
            navigateToPage('profile');
        }
    }
    
    function deleteProfile(profileId) {
        if (confirm('Are you sure you want to delete this profile? This cannot be undone.')) {
            savedProfiles = savedProfiles.filter(p => p.id != profileId);
            localStorage.setItem('devProfiles', JSON.stringify(savedProfiles));
            
            // Update gallery
            renderProfileCards();
        }
    }
    
    // Utility function to format dates
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
        });
    }
    
    // Initialize
    function init() {
        // Log initialized elements
        console.log('Initializing DevProfile app');
        console.log('Skills button found:', !!addSkillBtn);
        console.log('Experience button found:', !!addExperienceBtn);
        console.log('Education button found:', !!addEducationBtn);
        
        // Render profile cards
        renderProfileCards();
    }
    
    // Call init function
    init();
});
