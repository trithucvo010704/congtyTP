# MEMORY.MD — HỆ THỐNG GHI NHỚ TIẾN ĐỘ & NHẬT KÝ VẬN HÀNH TP TEAMS

File này đóng vai trò là "bộ nhớ dài hạn" của dự án, lưu trữ toàn bộ các công việc đã thực hiện qua từng phiên làm việc (chat session), đối soát với Kế hoạch 10, trạng thái tài nguyên live và các bước triển khai tiếp theo. Bất kỳ phiên làm việc nào sau này đều phải đọc file này để tiếp nối công việc mà không bị lặp lại hoặc sai lệch.

---

## I. THÔNG TIN ĐỊNH DANH HỆ SINH THÁI TP TEAMS

- **Tên thương hiệu:** **TP TEAMS (TP Teams Software & AI Engineering)**
- **Nhà sáng lập (Founder & Tech Lead):** **Võ Trí Thức** (Kỹ sư CNTT — Đại học Công nghiệp Hà Nội - HaUI).
- **Hotline / Zalo:** `0349 363 992` | **Telegram:** `@Trithuc23`
- **Mục tiêu cốt lõi:** Biến lưu lượng truy cập thành khách hàng tiềm năng và tự động hóa quy trình nghiệp vụ cho SME bằng Web, Backend và AI.

---

## II. ĐỊA CHỈ HỆ THỐNG PRODUCTION ĐANG CHẠY (100% LIVE)

| Phân hệ | Đường dẫn Live | Hạ tầng & Công nghệ | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Landing Page TP Teams** | [https://landing.votrithuc.click](https://landing.votrithuc.click) | HTML5, Tailwind CSS, Vercel Edge, Song ngữ VI/EN, Telegram Webhook | **200 OK — Active** |
| **Candidate Portal (D3)** | [https://jobs.votrithuc.click](https://jobs.votrithuc.click) | Next.js 15, Vercel, Cổng nộp CV PDF thật, Tra cứu mã hồ sơ | **200 OK — Active** |
| **HRM Cockpit (D3)** | [https://hrm.votrithuc.click/login](https://hrm.votrithuc.click/login) | Next.js 15, Vercel, Nút 1-Click Recruiter Demo, Kanban, AI Writer | **200 OK — Active** |
| **Backend API Gateway** | [https://api.votrithuc.click](https://api.votrithuc.click) | Spring Boot 3, Java 23, VPS Ubuntu 24.04 (`103.211.200.225`) | **200 OK — UP** |
| **Database & Cache** | `datn_hrm` (PostgreSQL 16) / Redis 7 | Docker container trên VPS (`platform-postgres`, `platform-redis`) | **Healthy** |
| **Telegram Lead Bot** | `@tp_thulead_bot` | Nhóm: `🔔 Khách Hàng - Landing Page` (`-5594643003`) | **Active (< 2s)** |

---

## III. TIẾN ĐỘ THỰC HIỆN THEO KẾ HOẠCH 10 (ROADMAP STATUS)

### 🌟 MẢNG LỚN 1: BỘ BA SẢN PHẨM MINH CHỨNG (D1 - D2 - D3)
- [x] **1.1. Demo 1 (D1) — Trang đích Chạy Ads Thu Lead:**
  - Đã xây dựng hoàn chỉnh giao diện chuyển đổi cao trên [landing.votrithuc.click](https://landing.votrithuc.click).
  - Tích hợp tính năng **Interactive D1 Sandbox**: Khách hàng kiểm chứng trực tiếp tốc độ bắn webhook về Telegram trong < 2 giây.
  - Tích hợp bộ bắt tham số **UTM Tracking** tự động (`utm_source`, `utm_medium`, `utm_campaign`).
  - Validation chặt chẽ số điện thoại di động Việt Nam (10 chữ số).
  - Hỗ trợ **Song ngữ Hoàn chỉnh (Tiếng Việt 🇻🇳 & English 🇬🇧)** chuyển đổi mượt mà 1-click.
- [x] **1.2. Demo 2 (D2) — Hệ thống Quản trị Lead Tập Trung (Lead Hub / Mini-CRM):**
  - Đã có nền tảng API, PostgreSQL, Spring Boot sẵn sàng trên VPS để tiếp nhận và phân loại lead.
- [x] **1.3. Demo 3 (D3) — Hệ thống Tuyển dụng AI (VTT Careers HRM):**
  - Đã nghiệm thu toàn diện `/goal` với **100% dữ liệu thật chuẩn tiếng Việt** (0 chữ test, 5 tin tuyển dụng chiến lược, 15 ứng viên thật).
  - Tích hợp thành công DeepSeek AI key (`sk-034e...`) cho tính năng AI JD Writer.
  - Tích hợp cơ chế đăng nhập **1-Click Recruiter Demo Showcase** vào thẳng dashboard.
  - Kiểm thử thành công 100% các API công khai và nội bộ (Nộp CV PDF, Đánh giá vòng tuyển PASS/FAIL, Tra cứu tiến độ).

### 🌟 MẢNG LỚN 2: HẠ TẦNG KỸ THUẬT & CI/CD (FOUNDATION)
- [x] **2.1. Quản trị VPS & Docker:** Chạy ổn định PostgreSQL 16, Redis, Backend Spring Boot, Nginx SSL Let's Encrypt.
- [x] **2.2. CI/CD Pipelines:**
  - GitHub Actions `Backend CI` & `Backend Production Deploy`: Xanh 100%.
  - Vercel Auto-deploy: Tự động deploy mỗi khi push code lên GitHub repo `congtyTP`, `hrm_dashboard`, `candidate_portal`.
- [x] **2.3. Quy chuẩn & Tài liệu vận hành:** Đã ban hành bộ quy tắc bắt buộc tại [tailieu/09_QUY_CHUAN_RUN_GOAL_VA_KINH_NGHIEM_HE_THONG.md](file:///home/trithucvo23/Documents/LandingPage/tailieu/09_QUY_CHUAN_RUN_GOAL_VA_KINH_NGHIEM_HE_THONG.md) và [tailieu/10_KE_HOACH_DAI_HAN_VA_LO_TRINH_TRIEN_KHAI_CHI_TIET.md](file:///home/trithucvo23/Documents/LandingPage/tailieu/10_KE_HOACH_DAI_HAN_VA_LO_TRINH_TRIEN_KHAI_CHI_TIET.md).

### 🌟 MẢNG LỚN 3: KINH DOANH & TÌM KIẾM KHÁCH HÀNG (COMMERCIALIZATION)
- [x] **3.1. Đóng gói Bảng giá Dịch vụ Minh bạch:** Đã niêm yết công khai trên Landing Page (Gói D1: 3.5tr, Gói D1+D2: 14tr, Gói D3: từ 25tr).
- [x] **3.2. Khai thác Sàn Freelance (vLance.vn, FreelancerViet.vn):** Đã hoàn tất tài liệu hồ sơ Bio chuẩn, Headline, Skills tag và Bộ 3 mẫu Proposal bách phát bách trúng tại [tailieu/11_BO_HO_SO_VA_MAU_CHAO_GIA_VLANCE_FREELANCERVIET.md](file:///home/trithucvo23/Documents/LandingPage/tailieu/11_BO_HO_SO_VA_MAU_CHAO_GIA_VLANCE_FREELANCERVIET.md).
- [ ] **3.3. Hợp tác Đối tác B2B Marketing Agencies:** Chuẩn bị kịch bản tiếp cận và thư ngỏ hợp tác kỹ thuật.
- [ ] **3.4. Xây dựng Kênh Nội dung & Case Studies:** Xuất bản các bài viết giải pháp thực tế.

---

## IV. NHẬT KÝ CÁC PHIÊN LÀM VIỆC (SESSION LOGS)

### Phiên làm việc: Ngày 22/09/2026 (Phiên 1 - Hoàn tất /goal HRM AI)
- **Nhiệm vụ:** Kiểm thử toàn bộ API trên giao diện, chuẩn hóa 100% dữ liệu thật (xóa sạch dữ liệu test), cấu hình DeepSeek AI key, tạo cơ chế đăng nhập 1-Click Demo Showcase cho khách hàng xem thử nghiệm.
- **Kết quả:**
  1. Cấu hình DeepSeek API key vào PostgreSQL VPS và `.env.vps`, kiểm thử sinh JD tự động thành công.
  2. Bơm 15 ứng viên thật tiếng Việt (Trần Văn Huynh, Nguyễn Hữu Thắng, Mai Thảo Vy, Đặng Minh Quân,...) và 5 tin tuyển dụng chiến lược.
  3. Tích hợp nút 1-Click Recruiter Demo trên trang login của HRM Dashboard.
  4. Test pass 100% API (nộp CV, tra cứu, đánh giá vòng tuyển PASS/FAIL, thống kê stats).
  5. GitHub CI/CD và Vercel deploy đạt trạng thái Success (Green).
  6. Ban hành tài liệu quy chuẩn `09_QUY_CHUAN_RUN_GOAL_VA_KINH_NGHIEM_HE_THONG.md` và `walkthrough.md`.

### Phiên làm việc: Ngày 22/09/2026 (Phiên 3 - Tối ưu Pain Points, Vị thế Kỹ sư Viettel & Phản biện AI)
- **Nhiệm vụ:** Đưa uy tín kỹ sư Viettel của Founder vào hệ thống, xây dựng khối Pain Points chính xác về rò rỉ ngân sách ads, tạo bảng phản biện đanh thép "Tại sao không dùng AI mà nên thuê TP Teams?", và cơ cấu lại bảng giá thị trường thực tế (1.9Tr Starter, 3.8Tr Pro, 8.9Tr CRM).
- **Kết quả:**
  1. Header & Hero: Tích hợp huy hiệu đỏ nổi bật `VIETTEL SOFTWARE ENGINEER` và thông điệp chuẩn viễn thông.
  2. Bổ sung Section Cảnh Báo Đỏ (4 Lỗ Hổng Rò Rỉ Tiền Ads): Tải chậm >3s, phản hồi trễ nguội khách, thiếu UTM mù quáng, và bị bắt con tin phí thuê bao hàng năm.
  3. Bổ sung Section Phản Biện AI vs TP Teams: So sánh chi tiết 5 tiêu chí giữa Code AI tự sinh, Nền tảng kéo thả LadiPage và Giải pháp thực chiến TP Teams.
  4. Cập nhật Bảng Giá Thực Tế (Không ngáo giá): 1.9M (Starter) / 3.8M (Pro) / 8.9M (CRM) sở hữu mã nguồn vĩnh viễn, 0 VNĐ phí thường niên.
  5. Cập nhật đồng bộ vào `index.html`, `tailieu/11_BO_HO_SO_VA_MAU_CHAO_GIA_VLANCE_FREELANCERVIET.md`.
  6. Git commit `422d72a` và Vercel deploy thành công `state: success` live trên `https://landing.votrithuc.click`.

---

## V. NHIỆM VỤ TIẾP THEO ĐANG THỰC HIỆN (CURRENT SPRINT)
1. Đăng ký tài khoản và hoàn thiện Profile trên **vLance.vn** và **FreelancerViet.vn** theo `tailieu/11`.
2. Bắt đầu gửi 3-5 Proposal mỗi ngày trong các khung giờ vàng (8h30-9h30 và 14h-15h).
3. Triển khai tài liệu kịch bản tiếp cận B2B Agency Marketing (Kênh 2).
