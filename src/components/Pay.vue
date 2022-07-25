<template>
  <div class="pay">
      这里是商品支付页面
    <form
      name="punchout_form"
      method="post"
      action="https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=OCdTig6iG8RUOkVfy7%2BH63SBvwHIIOiogWoKwy1r4Aiqxc7vzCyMHToD%2FEUkCzC3eoxfHOLK70pXYBoFyDult%2FDqckLFy%2BQF0AKSE0wnmFFjYWIFvovOvUvZ7JU6YiVTLZvEa4XjKSmD2zyChcgjtSb8ML4zBAmpHX0iZG9Qy2l6aSm8q3iLdZT%2B5Dkw9GdFmJRpH8cuLAOkVtZTGuWnhWwET9lFMw5N2d9Ec%2BEr58l0XE%2Bs%2FNw4fUKCSeCKl0ZaH88%2B%2BpWQwrO%2F%2F3CN1aOpFG1kqH0zVmFijMI9wQkprKkaHUaTVLwDuM6thar4O0tomWRTz1cHx143d2TQnD8jXw%3D%3D&return_url=https%3A%2F%2Fwww.baidu.com&notify_url=https%3A%2F%2Fwww.baidu.com&version=1.0&app_id=2021000118699149&sign_type=RSA2&timestamp=2022-01-17+16%3A17%3A45&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json"
    >
      <input
        type="text"
        name="biz_content"
        value='{"out_trade_no":"6460c0e0-cb55-43c8-8793-9bb816119cfb","total_amount":"265.8","subject":"支付宝沙箱支付","product_code":"FAST_INSTANT_TRADE_PAY"}'
      />
      <input type="submit" value="立即支付"/>
    </form>
  </div>
</template>