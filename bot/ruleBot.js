function ruleBot(text) {
  text = text.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return "Xin chào! Mình là bot hỗ trợ tự động";
  }

  if (text.includes("giá")) {
    return "Bạn muốn hỏi giá sản phẩm nào?";
  }

  if (text.includes("ship")) {
    return "Mình hỗ trợ giao hàng toàn quốc.";
  }

  if (text.includes("cảm ơn")) {
    return "Không có gì! Rất vui vì được hỗ trợ bạn. Có vấn đề gì thì liên hệ mình ngay nhé";
  }

  return null;
}

module.exports = ruleBot;