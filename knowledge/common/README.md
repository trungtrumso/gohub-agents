# Knowledge dùng chung

Mọi agent đọc thư mục này. Skill khai báo file cần đọc bằng `knowledge: [product-context, common/glossary]`; khi có khai báo, agent chỉ nạp những file đó (cộng `lessons`).

Front-matter của mỗi file:

```yaml
title: Tên hiển thị
status: stub | draft | approved
owner: ai chịu trách nhiệm nội dung
review_by: YYYY-MM-DD   # hạn rà soát lại; để trống nếu chưa đặt
tags: [a, b]
sources: [tên nguồn — ngày]
```

Liên kết sang file khác bằng `[[ten-file]]`. Không chứa dữ liệu khách hàng, mã eSIM, thông tin thanh toán hay secret.
