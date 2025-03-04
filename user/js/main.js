$(function () {
  /* -------------------------------------------------------------------------- */
  /*                                     탭메뉴                                  */
  /* -------------------------------------------------------------------------- */
  $(".tab_menu li").click(function () {
    var tabId = $(this).attr("data-tab");

    $(".tab_menu li").removeClass("on");
    $(".tab_content").removeClass("active");

    $(this).addClass("on");
    $("#" + tabId).addClass("active");
  });

  $(".category_sec .swiper-wrapper > div").click(function () {
    var tabId = $(this).attr("data-tab");

    $(".category_sec .swiper-wrapper > div").removeClass("active");
    $(".commu_list").removeClass("on");
    $(".my_class_list").removeClass("on");

    $(this).addClass("active");
    $("#" + tabId).addClass("on");
  });

  // 이전에 선택한 탭 불러오기
  let savedTab = localStorage.getItem("selectedTab");

  if (savedTab) {
    $(".tab_menu.his li").removeClass("on");
    $(".tab_content.his").removeClass("active");

    $('.tab_menu.his li[data-tab="' + savedTab + '"]').addClass("on");
    $("#" + savedTab).addClass("active");
  }

  $(".tab_menu.his li").click(function () {
    var tabId = $(this).attr("data-tab");

    $(".tab_menu.his li").removeClass("on");
    $(".tab_content").removeClass("active");

    $(this).addClass("on");
    $("#" + tabId).addClass("active");

    // 선택한 탭을 로컬 스토리지에 저장
    localStorage.setItem("selectedTab", tabId);
  });

  /* -------------------------------------------------------------------------- */
  /*                                  토글 슬라이드                                 */
  /* -------------------------------------------------------------------------- */
  $(".slide_btn").on("click", function () {
    $(this).toggleClass("on");
    $(".slide_content").toggleClass("on");
  });
  /* -------------------------------------------------------------------------- */
  /*                              체크 박스 토글 메뉴                               */
  /* -------------------------------------------------------------------------- */
  $(".check_slide").each(function () {
    const $checkWrap = $(this);
    const $checkInput = $checkWrap.find("input[type='checkbox']");
    const $slideContent = $checkWrap.find(".check_slide_content");

    $checkInput.on("change", function () {
      if ($(this).is(":checked")) {
        $slideContent.addClass("on"); // 체크되면 보이기
      } else {
        $slideContent.removeClass("on"); // 체크 해제되면 숨기기
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                                   토글 on/off                               */
  /* -------------------------------------------------------------------------- */
  $(".toggle_on").on("click", function () {
    $(this).toggleClass("on");
  });
  // 북마ㅣㅋ
  $(".icon_bookmark").on("click", function () {
    $(this).toggleClass("on");
  });

  /* -------------------------------------------------------------------------- */
  /*                              이미지 업로드 프리뷰                               */
  /* -------------------------------------------------------------------------- */
  // 프로필
  $("#profileUpload").on("change", function (event) {
    var file = event.target.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#profilePreview").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(file);
    } else {
      $("#profilePreview").hide();
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                               커스텀 셀렉트 박스                               */
  /* -------------------------------------------------------------------------- */
  $(".input_box").each(function () {
    var $inputBox = $(this);
    var $input = $inputBox.find(".search_box input");
    var $dropdown = $inputBox.find(".drop_down");

    // 입력 필드 클릭 시 해당 드롭다운
    $input.on("focus", function () {
      $dropdown.show();
    });

    // 입력 값 변경 시 해당 리스트 필터링
    $input.on("keyup", function () {
      var searchVal = $(this).val().toLowerCase();
      $dropdown.find("li").each(function () {
        var text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(searchVal));
      });
    });

    // 리스트 클릭 시 선택하고 드롭다운 닫기
    $dropdown.on("mousedown", "li", function () {
      $input.val($(this).text()); // 값 입력
    });

    // input이 포커스를 잃으면 드롭다운 닫기
    $input.on("blur", function () {
      setTimeout(() => {
        $dropdown.hide();
      }, 100);
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                      모달창                                  */
/* -------------------------------------------------------------------------- */
function open_modal(modal_id) {
  $(modal_id).addClass("on");
}
function close_modal() {
  $(".modal_wrap").removeClass("on");
}

/* -------------------------------------------------------------------------- */
/*                                 Bottom Sheet                               */
/* -------------------------------------------------------------------------- */
$(function () {
  $(".open_bottom_sheet").on("click", function () {
    var sheetId = $(this).data("target"); // 클릭한 버튼의 data-target 값 가져오기

    // 모든 바텀시트 닫기
    $(".bottom_sheet").removeClass("open");
    $(".bottom_sheet_overlay").removeClass("active");

    // 해당 바텀시트만 열기
    $("#" + sheetId).addClass("open");
    $(".bottom_sheet_overlay").addClass("active");
  });

  // Bottom Sheet 닫기 함수
  function closeBottomSheet() {
    $(".bottom_sheet").removeClass("open");
    $(".bottom_sheet_overlay").removeClass("active");
  }

  // 닫기 버튼 클릭 시 해당 바텀시트 닫기
  $(".close_bottom_sheet").on("click", function () {
    $(this).closest(".bottom_sheet").removeClass("open");
    $(".bottom_sheet_overlay").removeClass("active");
    closeBottomSheet();
  });

  // 오버레이 클릭 시 닫기
  $(".bottom_sheet_overlay").on("click", function () {
    closeBottomSheet();
  });

  // ESC 키 입력 시 닫기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeBottomSheet();
    }
  });
});
