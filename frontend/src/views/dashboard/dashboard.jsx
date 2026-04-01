import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award,
  TrendingUp,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Building2,
  UserCheck,
  Target,
  Clock,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Star,
  CheckCircle
} from 'lucide-react'


const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-25')
  
  // Mock data for NAAC dashboard
  const keyMetrics = [
    {
      title: 'Total Faculty',
      value: '248',
      change: '+12',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Total Students',
      value: '3,456',
      change: '+234',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Research Papers',
      value: '186',
      change: '+28',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Accreditation Score',
      value: '3.4/4.0',
      change: '+0.2',
      changeType: 'positive',
      icon: Award,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ]

  const naacCriteria = [
    {
      criteria: 'Research & Innovation',
      score: 72,
      maxScore: 100,
      status: 'good',
      description: 'Research output and innovation initiatives'
    }

  ]

  const recentActivities = [
    { action: 'Faculty evaluation completed', department: 'Computer Science', time: '2 hours ago', type: 'completed' },
    { action: 'Research paper submitted', department: 'Biotechnology', time: '4 hours ago', type: 'submitted' },
    //{ action: 'Infrastructure audit scheduled', department: 'Administration', time: '1 day ago', type: 'scheduled' },
    { action: 'Student feedback collected', department: 'All Departments', time: '2 days ago', type: 'collected' }
  ]

  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getStatusBadge = (status) => {
    const badges = {
      excellent: 'bg-green-100 text-green-800 border-green-200',
      good: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      needs_improvement: 'bg-red-100 text-red-800 border-red-200'
    }
    return badges[status] || badges.good
  }

  const navigate = useNavigate();

  const forms = [
    { title: 'SEED MONEY', path: '/dashboard/seed-money' },
    { title: '3.1.3 : Award', path: '/dashboard/award' },
    { title: '3.1.4 : Fellowship', path: '/dashboard/fellowship' },
    { title: '3.3.2 : Workshops / Seminars', path: '/dashboard/workshops' },
    { title: '3.3.3 : Innovation', path: '/dashboard/innovation' },
    { title: '3.4.3 : Patents Published', path: '/dashboard/patents' },
    { title: "3.4.4 : PhD's Awarded", path: '/dashboard/phds' },
    { title: '3.4.5 : Research Papers', path: '/dashboard/research-papers' },
    { title: '3.4.6.1 : Books', path: '/dashboard/books' },
    { title: '3.7.1 : Collaborative Activity', path: '/dashboard/collaborative-activity' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">A Data Collection & Aggregation System for NAAC Accreditation in 
MANUU</p>
<div>
        </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-3xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="2024-25">Academic Year 2025-26</option>
                <option value="2024-25">Academic Year 2024-25</option>
                <option value="2023-24">Academic Year 2023-24</option>
                <option value="2022-23">Academic Year 2022-23</option>
              </select>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-3xl px-6">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="bg-white border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-3xl flex items-center justify-center border ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-2xl ${
                      metric.changeType === 'positive' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
  
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
          
          {/* NAAC Criteria Assessment */}
          <div className="xl:col-span-2">
            <Card className="bg-white border-gray-200 rounded-3xl shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">NAAC Criteria Assessment</CardTitle>
                    <CardDescription className="text-gray-600">Research & innovation </CardDescription>
                  </div>
                  <Button variant="outline" className="border-gray-200 rounded-3xl">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {naacCriteria.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-3xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.criteria}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-gray-900">{item.score}%</div>
                        <span className={`inline-block px-3 py-1 rounded-2xl text-xs font-medium border ${getStatusBadge(item.status)}`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getScoreColor(item.score)} transition-all duration-500`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>


          {/* Quick Actions & Recent Activities */}
          <div className="space-y-6">
            
            

            {/* Recent Activities */}
            <Card className="bg-white border-gray-200 rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Recent Activities</CardTitle>
                <CardDescription className="text-gray-600">Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-3xl border border-gray-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.department}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-gray-200 rounded-3xl text-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-200 rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-200">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">12</h3>
                  <p className="text-sm text-gray-600">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-3xl flex items-center justify-center border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">95%</h3>
                  <p className="text-sm text-gray-600">Compliance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-3xl flex items-center justify-center border border-purple-200">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">A+</h3>
                  <p className="text-sm text-gray-600">Current Grade</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-200">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">45</h3>
                  <p className="text-sm text-gray-600">Days to Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>

        {/* NAAC Criteria Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(form.path)}
            >
              {form.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Dashboard