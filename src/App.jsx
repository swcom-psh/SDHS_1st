import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, LogIn, User, Clock, Send } from 'lucide-react';

const App = () => {
    const [user, setUser] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock Google Login based on User Requirements
    const handleLogin = () => {
        // 성 = 학번, 이름 = 이름 (요청사항 반영)
        const mockUser = {
            id: '30415', // family_name (Last Name)
            name: '김철수', // given_name (First Name)
            email: 'chulsoo.kim@school.hs.kr'
        };
        setUser(mockUser);
    };

    const toggleDate = (dateString) => {
        if (selectedDates.includes(dateString)) {
            setSelectedDates(selectedDates.filter(d => d !== dateString));
        } else {
            setSelectedDates([...selectedDates, dateString]);
        }
    };

    const handleSubmit = async () => {
        if (selectedDates.length === 0) return;

        setIsSubmitting(true);

        // Simulate API call to Google Apps Script
        const timestamp = new Date().toLocaleString('ko-KR', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        const payload = {
            studentId: user.id,
            name: user.name,
            appliedAt: timestamp,
            dates: selectedDates.sort()
        };

        console.log('Sending to Google Sheets:', payload);

        // Actual Implementation would use fetch(GAS_URL, { method: 'POST', body: JSON.stringify(payload) })
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Reset after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        // Previous month padding
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`prev-${i}`} className="calendar-day not-current"></div>);
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isSelected = selectedDates.includes(dateStr);
            const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

            days.push(
                <div
                    key={dateStr}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => toggleDate(dateStr)}
                >
                    {d}
                    {isSelected && <div className="dot" />}
                </div>
            );
        }

        return days;
    };

    if (!user) {
        return (
            <div className="login-container">
                <div className="glass-card login-box">
                    <div className="logo-section">
                        <div className="icon-wrapper">
                            <Calendar size={48} className="text-indigo-400" />
                        </div>
                        <h1>야간 자율학습 신청</h1>
                        <p>리로스쿨보다 더 간편하게, 구글 계정으로 시작하세요.</p>
                    </div>

                    <button onClick={handleLogin} className="google-login-btn">
                        <div className="google-icon-wrapper">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>
                        <span>Google 계정으로 로그인</span>
                    </button>
                </div>

                <style>{`
          .login-container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .login-box {
            max-width: 450px;
            width: 100%;
            padding: 48px;
            text-align: center;
          }
          .logo-section h1 {
            font-size: 2rem;
            margin: 24px 0 12px;
            font-weight: 700;
            background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .logo-section p {
            color: #94a3b8;
            margin-bottom: 40px;
            font-size: 1rem;
          }
          .icon-wrapper {
            display: inline-flex;
            padding: 20px;
            background: rgba(79, 70, 229, 0.1);
            border-radius: 20px;
            color: #818cf8;
          }
          .google-login-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            padding: 14px;
            background: white;
            color: #374151;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          .google-login-btn:hover {
            background: #f3f4f6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="main-header">
                <div className="user-profile glass-card">
                    <div className="user-icon">
                        <User size={20} />
                    </div>
                    <div className="user-info">
                        <span className="student-id">{user.id}</span>
                        <span className="student-name">{user.name}</span>
                    </div>
                </div>
                <div className="header-meta">
                    <h1>야간 자율학습 신청</h1>
                </div>
            </header>

            <main className="main-content">
                <section className="calendar-section glass-card">
                    <div className="calendar-header">
                        <h2>
                            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                        </h2>
                        <div className="calendar-nav">
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="calendar-weekdays">
                        {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d}>{d}</div>)}
                    </div>

                    <div className="calendar-grid">
                        {renderCalendar()}
                    </div>

                    <div className="calendar-footer">
                        <div className="selection-info">
                            <Clock size={16} className="text-indigo-400" />
                            <span>선택된 날짜: <strong>{selectedDates.length}일</strong></span>
                        </div>
                        <button
                            className={`submit-btn ${selectedDates.length === 0 ? 'disabled' : ''} ${isSubmitting ? 'loading' : ''}`}
                            disabled={selectedDates.length === 0 || isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? '신청 중...' : (isSuccess ? '신청 완료!' : '신청하기')}
                            {isSuccess ? <CheckCircle size={18} /> : <Send size={18} />}
                        </button>
                    </div>
                </section>

                <section className="history-section glass-card">
                    <h3>신청 내역 요약</h3>
                    {selectedDates.length > 0 ? (
                        <div className="dates-tags">
                            {selectedDates.sort().map(date => (
                                <span key={date} className="date-tag">
                                    {date.split('-').slice(1).join('/')}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">신청할 날짜를 달력에서 선택해 주세요.</p>
                    )}
                </section>
            </main>

            {isSuccess && (
                <div className="success-toast">
                    <CheckCircle size={24} />
                    <span>신청 내역이 스프레드시트에 저장되었습니다.</span>
                </div>
            )}

            <style>{`
        .app-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          width: 100%;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
        }
        .user-icon {
          background: rgba(79, 70, 229, 0.2);
          color: #818cf8;
          padding: 8px;
          border-radius: 10px;
        }
        .user-info {
          display: flex;
          flex-direction: column;
        }
        .student-id {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }
        .student-name {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .header-meta h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f8fafc;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 24px;
        }
        .calendar-section {
          padding: 32px;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .calendar-header h2 {
          font-size: 1.4rem;
          font-weight: 700;
        }
        .calendar-nav {
          display: flex;
          gap: 8px;
        }
        .calendar-nav button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 6px;
          border-radius: 8px;
          cursor: pointer;
        }
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          color: #64748b;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 16px;
        }
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          position: relative;
        }
        .calendar-day.today {
          border: 1px solid #4f46e5;
          color: #818cf8;
        }
        .dot {
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          position: absolute;
          bottom: 8px;
        }
        .calendar-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .selection-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
        }
        .submit-btn {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .submit-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }
        .submit-btn:not(.disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }

        .history-section {
          padding: 24px;
          height: fit-content;
        }
        .history-section h3 {
          margin-bottom: 20px;
          font-size: 1.1rem;
          color: #f8fafc;
        }
        .dates-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .date-tag {
          background: rgba(79, 70, 229, 0.1);
          border: 1px solid rgba(79, 70, 229, 0.2);
          color: #a5b4fc;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .empty-state {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .success-toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: #10b981;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          animation: slideUp 0.5s ease;
          z-index: 100;
        }
        @keyframes slideUp {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
          }
          .history-section {
            order: 2;
          }
        }
      `}</style>
        </div>
    );
};

export default App;
