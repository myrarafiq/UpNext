import React, { useState } from 'react';
import { Users, Calendar, Video, MessageCircle, Star, Award, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MentorHub = () => {
  const { userData, completedTasks, mentorSessions, bookMentorSession } = useApp();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Mock mentor data
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Data Scientist',
      company: 'Google',
      expertise: ['Machine Learning', 'Python', 'Data Analysis'],
      rating: 4.9,
      sessions: 127,
      hourlyRate: 'Free for students',
      avatar: 'SJ',
      bio: '10+ years in ML/AI. Specialized in helping beginners transition into data science careers.',
      availability: ['Mon 6-8 PM', 'Wed 6-8 PM', 'Sat 10 AM-12 PM']
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Full Stack Lead',
      company: 'Meta',
      expertise: ['React', 'Node.js', 'System Design'],
      rating: 4.8,
      sessions: 95,
      hourlyRate: 'Free for students',
      avatar: 'MC',
      bio: 'Passionate about teaching web development and helping juniors build production-ready skills.',
      availability: ['Tue 7-9 PM', 'Thu 7-9 PM', 'Sun 2-4 PM']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Staff Software Engineer',
      company: 'Amazon',
      expertise: ['Algorithms', 'System Design', 'Interview Prep'],
      rating: 5.0,
      sessions: 143,
      hourlyRate: 'Free for students',
      avatar: 'ER',
      bio: 'Formerly worked at Netflix and Airbnb. Expert in technical interviews and career growth.',
      availability: ['Fri 5-7 PM', 'Sat 3-5 PM']
    }
  ];

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const confirmBooking = (timeSlot) => {
    bookMentorSession({
      mentor: selectedMentor,
      timeSlot,
      topic: 'Portfolio Review',
      scheduledDate: new Date(),
      status: 'scheduled'
    });
    setShowBookingModal(false);
    setSelectedMentor(null);
    alert(`Session booked with ${selectedMentor.name}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentor Hub</h2>
            <p className="text-gray-600">
              Connect with industry experts for portfolio reviews, skill guidance, and career advice.
            </p>
          </div>
        </div>
      </div>

      {/* AI Mentor Suggestions */}
      <div className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">AI Recommends a Mentor Session</h3>
            <p className="text-purple-100 mb-4">
              Based on your progress in {completedTasks[completedTasks.length - 1]?.title || 'recent topics'}, 
              we suggest booking a session to review your portfolio and get expert feedback.
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              View Recommended Mentors
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{mentors.length}</div>
              <div className="text-xs text-gray-600">Available Mentors</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{mentorSessions?.length || 0}</div>
              <div className="text-xs text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-xs text-gray-600">Upcoming Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="card hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {mentor.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                <div className="text-sm text-gray-600 mb-1">{mentor.title} at {mentor.company}</div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{mentor.rating}</span>
                  </div>
                  <div className="text-gray-500">•</div>
                  <div>{mentor.sessions} sessions</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">{mentor.bio}</p>

            {/* Expertise Tags */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Expertise:</div>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Available:</div>
              <div className="flex flex-wrap gap-2">
                {mentor.availability.map((slot, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    {slot}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">{mentor.hourlyRate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleBookSession(mentor)}
                className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Session
              </button>
              <button className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      {mentorSessions && mentorSessions.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {mentorSessions.filter(s => s.status === 'scheduled').map((session, idx) => (
              <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {session.mentor.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{session.mentor.name}</div>
                      <div className="text-sm text-gray-600">{session.topic}</div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {new Date(session.scheduledDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary text-sm py-1 px-4 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Book Session with {selectedMentor.name}
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Time Slot:
              </label>
              <div className="space-y-2">
                {selectedMentor.availability.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => confirmBooking(slot)}
                    className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-primary-600 hover:bg-primary-50 text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-semibold text-gray-900">{slot}</div>
                        <div className="text-sm text-gray-600">60 minute session</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h4 className="font-bold text-gray-900 mb-3">How Mentor Sessions Work</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <div className="font-semibold mb-1">1. Book a Session</div>
            <div>Choose a mentor and available time slot</div>
          </div>
          <div>
            <div className="font-semibold mb-1">2. Prepare Materials</div>
            <div>Share your portfolio or specific questions</div>
          </div>
          <div>
            <div className="font-semibold mb-1">3. Get Expert Feedback</div>
            <div>Receive personalized guidance and actionable advice</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorHub;

