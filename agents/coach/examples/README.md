# Ví dụ của Coach

- `good/<task-id>.md`: artifact đã được reviewer chấp nhận, giữ nguyên front-matter, thêm `reviewer_note` nếu có.
- `bad/<task-id>.md`: artifact bị từ chối, thêm khối `rejection:` gồm `failed_criteria`, `notes`, và `corrected_example` nếu reviewer cung cấp.

Ví dụ được thêm bởi vòng lặp huấn luyện (Coach đề xuất, chủ dự án duyệt). Runner nạp tối đa `examples_in_prompt.good` và `.bad` ví dụ mới nhất vào prompt.
