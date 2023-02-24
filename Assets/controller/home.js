var home = {
    registerControl: function () {
        $('#btnRechargeDiamondByCard').click(function () {
            home.rechargeCardAnonymous();
        });
        $('#Telco').change(function () {
            home.getConfigCard($(this).val());
        });
        $('#showInformationPayment, #showInformationPaymentPakage').hide();
        $(document).on('change', '#sltChooseServiceHago', function () {
            if ($('#txtHagoIdResponse').val() <= 0 || $('#txtHagoUIdResponse').val() == '') {
                base.error('Vui lòng nhập Hago ID và kiểm tra');
                $('#sltChooseServiceHago').val(-1);
                return false;
            }
            if ($(this).val() == -1) {
                $('#showInformationPayment').hide();
                $('#showInformationPaymentPakage').hide();
                return;
            }
            if ($(this).val() == 0) {
                $('.textSyntaxRechargeAnonymous').html($(this).find(':selected').data('syntax') + ' ' + $('#txtHagoIdResponse').val());
                $('.btnCopySyntaxString').data('content', $(this).find(':selected').data('syntax') + ' ' + $('#txtHagoIdResponse').val());
                $('.syntaxExample').html($(this).find(':selected').data('syntax'));
                $('#showInformationPayment').show();
                $('#showInformationPaymentPakage').hide();
                return;
            }
            else {
                $('.textSyntaxRechargePakageAnonymous').html($(this).find(':selected').data('syntax') + ' ' + $('#txtHagoIdResponse').val());
                $('.btnCopyPakageSyntaxString').data('content', $(this).find(':selected').data('syntax') + ' ' + $('#txtHagoIdResponse').val());
                $('.syntaxExample').html($(this).find(':selected').data('syntax'));
                if ($(this).val() > 0) {
                    $('.textPricesServicesHago').html(accounting.formatMoney($(this).find(':selected').data('amount'), " đ", 0, ".", ",", "%v%s"));
                }
                $('#showInformationPayment').hide();
                $('#showInformationPaymentPakage').show();
            }
        });
        $('.btnCopySTK').on('click', function () {
            base.copy($(this).data('content'));
            base.success('Sao chép thành công');
        });
        $('.btnCopySyntaxString').on('click', function () {
            base.copy($(this).data('content'));
            base.success('Sao chép nội dung thành công');
        });
        $('#btnSearchInfor').click(function () {
            if ($('#txtHagoID').val() == '' || $('#txtHagoID').val() == null) {
                base.error('Vui lòng nhập Hago ID và kiểm tra');
                return;
            }
            else {
                home.getInforHago();
            }
        });
        $('#showPaymentCardRecharge').hide();
    },
    getConfigCard: function (telco) {
        $.ajax({
            url: '/cau-hinh-nap-the-cao',
            type: 'post',
            data: {
                telco: telco
            },
            success: function (res) {
                if (res.status) {
                    var html = '<option value="0">Chọn mệnh giá</option>';
                    for (var i = 0; i < res.listData.length; i++) {
                        html += '<option value="' + res.listData[i].Amount + '">Thẻ cào ' + accounting.formatMoney(res.listData[i].Amount, " đ", 0, ".", ",", "%v%s") + ' - Nhận ' + accounting.formatMoney(res.listData[i].Diamond, "", 0, ".", ",", "%v%s") + ' kim cương</option>';
                    }
                    $('#Amount').html(html);
                }
                else {
                    base.notification_popup('danger', res.message);
                }
            }
        })
    },
    rechargeCardAnonymous: function () {
        $.ajax({
            url: '/nap-kim-cuong-qua-the-cao',
            type: 'post',
            data: {
                HagoID: $('#txtHagoIdResponse').val(),
                Telco: $('#Telco').val(),
                Amount: $('#Amount').val(),
                Pin: $('#Pin').val(),
                Serial: $('#Serial').val()
            },
            beforeSend: function () {
                $('#btnRechargeDiamondByCard').prop('disabled', true);
            },
            success: function (res) {
                $('#btnRechargeDiamondByCard').prop('disabled', false);
                if (res.status) {
                    base.success(res.message);
                }
                else {
                    base.error(res.message);
                }
            }
        });
    },
    getInforHago: function () {
        $.ajax({
            url: '/lay-thong-tin-user',
            type: 'post',
            data: {
                vid: $('#txtHagoID').val()
            },
            beforeSend: function () {
                $('#btnSearchInfor').prop('disabled', true);
            },
            success: function (res) {
                $('#btnSearchInfor').prop('disabled', false);
                if (res.status) {
                    $('#txtNick').text(res.data.nick);
                    $('#txtVID').text('Hago ID: ' + res.data.vid);
                    $('#txtHagoIdResponse').val(res.data.vid);
                    $('#txtHagoUIdResponse').val(res.data.uid);
                    $('#txtAvatar').attr("src", res.data.avatar);
                    $('#bgAvatar').css('background-image', 'url(' + res.data.avatar + ')');
                }
                else {
                    base.error('Không tìm thấy thông tin người dùng');
                }
            }
        });
    }
};
$(document).ready(function () {
    home.registerControl();
});