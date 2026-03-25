import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Save, Camera } from 'lucide-react'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    skills: '',
    experience: '',
    education: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    // Simulate fetching profile data
    setTimeout(() => {
      setProfile({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Frontend Developer',
        bio: 'Passionate frontend developer with 5+ years of experience building responsive web applications. Specialized in React and modern JavaScript frameworks.',
        skills: 'React, JavaScript, TypeScript, Tailwind CSS, Redux, Git',
        experience: '5 years',
        education: 'Bachelor of Science in Computer Science'
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value
    })
  }

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setEditing(false)
      alert('Profile saved successfully!')
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          
          {/* Profile Header */}
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                {editing && (
                  <button className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 hover:bg-yellow-600 transition">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600">{profile.title}</p>
              </div>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="mt-4 md:mt-0 px-6 py-2 bg-yellow-500 text-slate-900 rounded-lg font-medium hover:bg-yellow-600 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="mt-4 md:mt-0 flex gap-3">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-yellow-500 text-slate-900 rounded-lg font-medium hover:bg-yellow-600 transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      {profile.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      {profile.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      {profile.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {editing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      {profile.location}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Title</label>
                  {editing ? (
                    <input
                      type="text"
                      name="title"
                      value={profile.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900">
                      <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                      {profile.title}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {editing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <p className="text-gray-900 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  {editing ? (
                    <textarea
                      name="skills"
                      value={profile.skills}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="React, JavaScript, etc."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.split(',').map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  {editing ? (
                    <input
                      type="text"
                      name="experience"
                      value={profile.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.experience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  {editing ? (
                    <textarea
                      name="education"
                      value={profile.education}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.education}</p>
                  )}
                </div>
              </div>
            </div>

            {editing && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-2 rounded-lg font-medium hover:bg-yellow-600 transition disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  {saving ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile