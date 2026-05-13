# FB Chatbot

Dự án này là một hệ thống Chatbot dành cho Facebook Messenger, được xây dựng trên nền tảng Node.js, Express và cơ sở dữ liệu MongoDB. Chatbot kết hợp giữa hệ thống phản hồi theo quy tắc (Rule-based) và trí tuệ nhân tạo (AI fallback) thông qua Groq API để tự động hóa việc hỗ trợ khách hàng.

## Các tính năng chính

* Tích hợp Webhook: Kết nối trực tiếp với Facebook Messenger API để nhận và gửi tin nhắn theo thời gian thực.
* Phản hồi theo quy tắc: Tự động nhận diện các từ khóa cơ bản như lời chào, hỏi giá, giao hàng để phản hồi nhanh chóng và chính xác.
* Tích hợp AI thông minh: Sử dụng mô hình ngôn ngữ lớn (thông qua Groq API với mô hình LLaMA 3.1) để xử lý và trả lời các câu hỏi phức tạp mà hệ thống quy tắc không thể giải quyết. AI được cấu hình để đóng vai trò như một nhân viên chăm sóc khách hàng thân thiện.
* Lưu trữ dữ liệu: Tự động lưu thông tin nhận diện người dùng (PSID) và toàn bộ lịch sử trò chuyện vào cơ sở dữ liệu MongoDB để quản lý và theo dõi.

## Cấu trúc dự án

* server.js: Tệp tin gốc khởi tạo máy chủ Express, kết nối cơ sở dữ liệu, cấu hình Webhook và quản lý luồng xử lý tin nhắn chính.
* bot/ruleBot.js: Chứa logic xử lý tin nhắn theo kịch bản có sẵn dựa trên các từ khóa.
* bot/aiBot.js: Tích hợp Groq API để khởi tạo nội dung trả lời tự động bằng AI.
* models/: Chứa các tệp tin định nghĩa cấu trúc dữ liệu Mongoose cho Người dùng (User.js) và Tin nhắn (Message.js).
* utils/sendMessage.js: Chứa hàm hỗ trợ gọi Facebook Graph API để gửi tin nhắn phản hồi về lại cho người dùng trên Messenger.
* package.json: Chứa danh sách các thư viện được sử dụng trong dự án.

## Yêu cầu hệ thống

Để chạy được dự án này, bạn cần chuẩn bị:
* Node.js để chạy môi trường máy chủ.
* Cơ sở dữ liệu MongoDB (có thể dùng bản cài cục bộ hoặc MongoDB Atlas).
* Tài khoản Facebook Developer và một Trang Facebook (Fanpage) để lấy Page Access Token và cấu hình Webhook.
* Tài khoản nền tảng Groq để lấy API Key phục vụ cho việc gọi AI.

## Hướng dẫn cài đặt

1. Cài đặt các thư viện:
Mở terminal tại thư mục dự án và chạy lệnh npm install để tải về tất cả các gói phụ thuộc.

2. Cấu hình biến môi trường:
Dựa vào tệp .env.example, tạo một tệp tin .env mới và điền đầy đủ các thông tin cấu hình như:
* Cổng chạy máy chủ (PORT).
* Chuỗi kết nối MongoDB (MONGO_URI).
* Mã xác minh Webhook tự chọn (VERIFY_TOKEN).
* Token truy cập của Fanpage (PAGE_ACCESS_TOKEN).
* Khóa bảo mật API của Groq (GROQ_API_KEY).

3. Khởi chạy máy chủ:
Sử dụng lệnh node server.js để chạy ứng dụng. Nếu bạn muốn tự động khởi động lại máy chủ khi sửa code, có thể dùng các công cụ như nodemon.

4. Thiết lập Webhook:
Sử dụng một công cụ trung gian như Ngrok để đưa máy chủ cục bộ của bạn lên mạng internet. Sau đó, dùng đường dẫn này cùng với mã xác minh đã đặt trong tệp .env để cấu hình Webhook trên trang quản lý ứng dụng của Facebook Developer. Cấp quyền gửi nhận tin nhắn cho ứng dụng để bot bắt đầu hoạt động.

## Công nghệ sử dụng

Dự án tận dụng các công nghệ hiện đại bao gồm Express để làm khung máy chủ web, Mongoose để tương tác với MongoDB, Axios để thực hiện các yêu cầu HTTP tới API bên thứ ba, và dotenv để quản lý cấu hình bảo mật một cách hiệu quả.
