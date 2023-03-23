export function LamaPagination(obj) {
  let paginationSize = obj.paginationSize == undefined ? 7 : obj.paginationSize;
  let limitPerPage = obj.limitPerPage == undefined ? 12 : obj.limitPerPage;
  let itemCount = obj.itemCount == undefined ? 50 : obj.itemCount;
  let prevName = obj.prev == undefined ? "Prev" : obj.prev;
  let nextName = obj.next == undefined ? "Next" : obj.next;

  let currentPage = 1;
  let totalPages = Math.ceil(itemCount / limitPerPage);

  this.setupPagination = (page, callBack) => {
    let paginationEl = document.getElementById("lama-pagination");
    paginationEl.innerHTML = "";

    currentPage = parseInt(page);
    callBack && callBack(currentPage, limitPerPage);

    if (itemCount < limitPerPage) return;
    // Previous button
    let prevLi = document.createElement("li");
    prevLi.className = `lama-page-item lama-previous-page${
      currentPage == 1 ? " lama-disable" : ""
    }`;
    prevLi.setAttribute("page", currentPage - 1);
    let prevA = document.createElement("a");
    prevA.className = "lama-page-link";
    prevA.innerText = prevName;
    prevLi.appendChild(prevA);
    paginationEl.appendChild(prevLi);
    prevLi.onclick = () => {
      let page = prevLi.getAttribute("page");
      page != 0 && this.setupPagination(page, callBack);
    };
    // Numbers buttons
    let arr = this.createPageArray(currentPage);
    for (let i = 0; i < arr.length; i++) {
      let numberLi = document.createElement("li");
      numberLi.className = `lama-page-item${
        arr[i] == "..." ? " lama-dots" : " lama-current-page"
      }${arr[i] == currentPage ? " lama-active" : ""}`;
      let numberA = document.createElement("a");
      numberA.className = "lama-page-link";
      numberA.innerText = arr[i];
      numberLi.appendChild(numberA);
      paginationEl.appendChild(numberLi);
      numberLi.onclick = () => {
        arr[i] != "..." && this.setupPagination(arr[i], callBack);
      };
    }
    // Next button
    let nextLi = document.createElement("li");
    nextLi.className = `lama-page-item lama-next-page${
      currentPage == totalPages ? " lama-disable" : ""
    }`;
    nextLi.setAttribute("page", currentPage + 1);
    let nextA = document.createElement("a");
    nextA.className = "lama-page-link";
    nextA.innerText = nextName;
    nextLi.appendChild(nextA);
    paginationEl.appendChild(nextLi);
    nextLi.onclick = () => {
      let page = nextLi.getAttribute("page");
      page != totalPages + 1 && this.setupPagination(page, callBack);
    };
  };

  this.createPageArray = (currentPage) => {
    let fixedSize = totalPages < paginationSize ? totalPages : paginationSize;
    let midPosition = Math.ceil(fixedSize / 2);

    let arr = Array.from(Array(fixedSize), (_, index) =>
      (index + 1).toString()
    );
    if (currentPage > midPosition) {
      while (true) {
        if (
          arr[midPosition - 1] == currentPage ||
          arr[fixedSize - 1] == totalPages
        )
          break;
        arr = arr.map((value) => (parseInt(value) + 1).toString());
      }
    }
    if (arr[0] != 1) {
      arr[0] = "1";
      arr[1] = "...";
    }
    if (arr[fixedSize - 1] != totalPages) {
      arr[fixedSize - 1] = totalPages.toString();
      arr[fixedSize - 2] = "...";
    }
    return arr;
  };
}
