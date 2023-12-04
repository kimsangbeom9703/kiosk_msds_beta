<?php $pager->setSurroundCount(5) ?>
<nav aria-label="<?= lang('Pager.pageNavigation') ?>">
    <ul class="pagination pagination-sm m-0 float-end">
        <li class="page-item"><a class="page-link" href="<?= $pager->getFirst() ?>">First</a></li>
        <li class="page-item"><a class="page-link" href="<?= $pager->getPreviousPage() ?>">Previous</a></li>
        <?php foreach ($pager->links() as $link) : ?>
            <li class="page-item <?= $link['active'] ? 'active' : '' ?>"><a class="page-link" href="<?= $link['uri'] ?>"><?= $link['title'] ?></a></li>
        <?php endforeach ?>
        <li class="page-item"><a class="page-link" href="<?= $pager->getNextPage() ?>">Next</a></li>
        <li class="page-item"><a class="page-link" href="<?= $pager->getLast() ?>">Last</a></li>
    </ul>
</nav>
